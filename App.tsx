import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ImageDisplay from './components/ImageDisplay';
import { generatePixelArt } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError("Image size cannot exceed 4MB.");
        return;
      }
      setError(null);
      setUploadedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset file input to allow re-uploading the same file
    event.target.value = '';
  };

  const handleClearImage = useCallback(() => {
    setUploadedImageFile(null);
    setUploadedImagePreview(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!prompt && !uploadedImageFile) {
      setError('Please enter a prompt or upload an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageSrc(null);

    try {
      const imageForApi = uploadedImagePreview && uploadedImageFile ? {
        mimeType: uploadedImageFile.type,
        data: uploadedImagePreview.split(',')[1],
      } : undefined;

      const src = await generatePixelArt(prompt, imageForApi);
      setImageSrc(src);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate image. ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, uploadedImageFile, uploadedImagePreview]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="mt-8">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
            onImageUpload={handleImageUpload}
            onClearImage={handleClearImage}
            imagePreviewUrl={uploadedImagePreview}
            uploadedFileName={uploadedImageFile?.name || null}
          />
          {error && (
            <div className="mt-4 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md text-center text-lg">
              <p>{error}</p>
            </div>
          )}
          <ImageDisplay 
            imageSrc={imageSrc} 
            isLoading={isLoading} 
            prompt={prompt} 
          />
        </main>
      </div>
      <footer className="w-full hover:text-amber-500 max-w-2xl mx-auto text-center py-4 mt-8 hover:bg-blue-700 text-white minecraft-text-xs font-minecraft leading-relaxed">
        <p>POWERED BY GOOGLE GEMINI & IMAGEN 3. DESIGNED BY A WORLD-CLASS REACT ENGINEER.</p>
      </footer>
    </div>
  );
};

export default App;