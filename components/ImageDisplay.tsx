
import React from 'react';
import Loader from './Loader';

interface ImageDisplayProps {
  imageSrc: string | null;
  isLoading: boolean;
  prompt: string;
}

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-slate-500">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <p className="mt-4 minecraft-text-lg font-minecraft leading-relaxed text-center">
      YOUR GENERATED PIXEL ART<br />WILL APPEAR HERE
    </p>
  </div>
);

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageSrc, isLoading, prompt }) => {
  return (
    <div className="mt-8 aspect-square w-full bg-slate-800/50 border-4 border-dashed border-slate-700 rounded-xl flex items-center justify-center p-4">
      {isLoading && <Loader />}
      {!isLoading && !imageSrc && <Placeholder />}
      {!isLoading && imageSrc && (
        <img
          src={imageSrc}
          alt={prompt || 'Generated pixel art'}
          className="w-full h-full object-contain [image-rendering:pixelated] [image-rendering:crisp-edges] rounded-lg"
        />
      )}
    </div>
  );
};

export default ImageDisplay;
