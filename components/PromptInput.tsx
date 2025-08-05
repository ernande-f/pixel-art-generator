import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: () => void;
  imagePreviewUrl: string | null;
  uploadedFileName: string | null;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading, onImageUpload, onClearImage, imagePreviewUrl, uploadedFileName }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="E.G., A BRAVE KNIGHT HOLDING A GLOWING SWORD"
        rows={3}
        className="w-full p-4 bg-slate-800 border-2 border-slate-700 rounded-lg minecraft-text-base text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-colors duration-200 resize-none font-minecraft leading-relaxed"
        disabled={isLoading}
        aria-label="Prompt for pixel art generation"
      />

      <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center text-center min-h-[10rem]">
        {imagePreviewUrl ? (
          <div className="relative">
            <img src={imagePreviewUrl} alt="Upload preview" className="max-h-32 rounded-lg [image-rendering:pixelated] [image-rendering:crisp-edges]" />
            <button
              type="button"
              onClick={onClearImage}
              className="absolute -top-3 -right-3 bg-red-700 hover:bg-red-600 text-white rounded-full h-7 w-7 flex items-center justify-center font-bold text-lg border-2 border-slate-800"
              aria-label="Remove image"
              disabled={isLoading}
            >
              &times;
            </button>
            <p className="text-slate-400 minecraft-text-xs mt-2 truncate max-w-xs" aria-label="Uploaded file name">{uploadedFileName}</p>
          </div>
        ) : (
          <>
            <label htmlFor="image-upload" className="cursor-pointer font-minecraft minecraft-text-base bg-slate-700 hover:bg-blue-700 hover:text-amber-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-200 font-bold py-3 px-5 rounded-lg transition-colors">
              UPLOAD IMAGE (OPTIONAL)
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={onImageUpload}
              className="hidden"
              disabled={isLoading}
              aria-label="Upload an image to convert to pixel art"
            />
             <p className="minecraft-text-xs text-slate-500 mt-2">MAX FILE SIZE: 4MB</p>
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full font-minecraft minecraft-text-lg hover:text-amber-500 bg-cyan-500 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-900 font-bold py-4 px-4 rounded-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center leading-tight"
      >
        {isLoading ? 'GENERATING...' : 'GENERATE'}
      </button>
    </form>
  );
};

export default PromptInput;