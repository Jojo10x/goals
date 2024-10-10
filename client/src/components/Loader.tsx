import React from 'react';
import "../index.css"

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        {/* Animated Spinner */}
        <div className="w-20 h-20 border-t-4 border-b-4 border-blue-400 rounded-full animate-spin"></div>
        
        {/* Bouncing Dots */}
        <div className="flex space-x-2 mt-10">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Loading Text */}
        <div className="absolute inset-x-0 bottom-0 text-center text-white mt-6">
          <p className="text-lg font-semibold">Loading</p>
          <div className="flex justify-center mt-2">
            <span className="w-1 h-1 bg-white rounded-full mr-1 animate-ping"></span>
            <span className="w-1 h-1 bg-white rounded-full mr-1 animate-ping delay-100"></span>
            <span className="w-1 h-1 bg-white rounded-full animate-ping delay-200"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
