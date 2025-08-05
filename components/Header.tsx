import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="font-minecraft minecraft-text-3xl sm:minecraft-text-4xl hover:bg-blue-700 text-cyan-400 tracking-wide leading-tight">
        PIXEL ART GENERATOR
      </h1>
      <p className="text-slate-300 hover:text-amber-500 mt-6 minecraft-text-base sm:minecraft-text-lg leading-relaxed">
        TRANSFORM YOUR IDEAS & IMAGES INTO RETRO PIXEL ART USING THE POWER OF AI
      </p>
    </header>
  );
};

export default Header;