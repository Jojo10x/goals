import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import GoalsList from "./components/GoalsList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { LogOut } from "lucide-react";
import "./App.css";
import SnackbarMessage from "./components/SnackbarMessage";
import Quotes from "./components/Quotes";

interface ErrorResponse {
  details: string;
  requestId: string;
  error: string;
}

interface CustomButtonProps {
  onClick: () => void;
  variant: "default" | "outline";
  children: React.ReactNode;
}

const CustomButton = ({ onClick, variant, children }: CustomButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded ${
      variant === "default"
        ? "bg-blue-500 text-white"
        : "bg-white text-blue-500 border border-blue-500"
    }`}
  >
    {children}
  </button>
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5007/api/auth/login",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Login error:", error);
      setSnackbarMessage("Login failed. Please check your credentials.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSignup = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5007/api/auth/signup",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      setSnackbarMessage("Signup successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Signup error:", error);

      let errorMessage = "Signup failed. Please try again.";
      let errorDetails = "";

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          errorMessage = axiosError.response.data.error || errorMessage;
          errorDetails = axiosError.response.data.details || "";
        } else if (axiosError.request) {
          errorMessage = "No response from server. Please try again later.";
        } else {
          errorMessage = axiosError.message;
        }
      } else {
        errorMessage = (error as Error).message || errorMessage;
      }

      setSnackbarMessage(
        `${errorMessage}${errorDetails ? ` - ${errorDetails}` : ""}`
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-purple-300 p-3 min-h-screen ">
      {isLoggedIn && (
        <header className="flex justify-between items-center ">
          <h1 className="text-4xl font-bold text-gray-800">Goals</h1>
          <button
            className="flex items-center bg-red-500 text-white py-2 px-4 rounded shadow-md hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" />
            Logout
          </button>
        </header>
      )}

      <Quotes />

      <div className="flex flex-col items-center justify-center  p-4">
        {isLoggedIn ? (
          <div className="">
            <GoalsList />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <CustomButton
                onClick={() => setIsLogin(true)}
                variant={isLogin ? "default" : "outline"}
              >
                Login
              </CustomButton>
              <CustomButton
                onClick={() => setIsLogin(false)}
                variant={!isLogin ? "default" : "outline"}
              >
                Sign Up
              </CustomButton>
            </div>
            {isLogin ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <SignupForm onSignup={handleSignup} />
            )}
          </div>
        )}

        <SnackbarMessage
          snackbarOpen={snackbarOpen}
          snackbarSeverity={snackbarSeverity}
          snackbarMessage={snackbarMessage}
          handleSnackbarClose={handleSnackbarClose}
        />
      </div>
    </div>
  );
};

export default App;
