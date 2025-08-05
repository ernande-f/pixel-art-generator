
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        <div className="w-6 h-6 bg-cyan-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-6 h-6 bg-cyan-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-6 h-6 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>
      <p className="minecraft-text-sm text-indigo-300 font-minecraft leading-tight">LOADING...</p>
    </div>
  );
};

export default Loader;
