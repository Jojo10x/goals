import React, { useState, useCallback } from 'react';
import { User } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>;
  onGoogleLogin: (token: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onGoogleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(username, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [username, password, onLogin]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <form onSubmit={handleSubmit} className="mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                onGoogleLogin(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.error('Google Login Failed');
            }}
            theme="outline"
            shape="rectangular"
            size="large"
            width={320}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;