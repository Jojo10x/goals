import React, { useState } from 'react';
import { User } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
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
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
