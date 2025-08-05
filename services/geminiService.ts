import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates pixel art from a text prompt and/or an image using Gemini and Imagen models.
 * @param prompt The user's text prompt.
 * @param image (Optional) An object containing the mimeType and base64 data of an image to use as inspiration.
 * @returns A promise that resolves to a base64 encoded image data URL.
 */
export const generatePixelArt = async (prompt: string, image?: { mimeType: string; data: string }): Promise<string> => {
  let finalPrompt = prompt;

  if (image) {
    try {
      const descriptionPrompt = `Analyze the attached image and the user's prompt. Then, write a new, highly detailed prompt for a text-to-image AI to create a 16-bit pixel art version. Combine the image's content with the user's instructions. If the user prompt is empty, just describe the image for pixel art conversion. User prompt: "${prompt}"`;
      
      const imagePart = { inlineData: image };
      const textPart = { text: descriptionPrompt };
      
      const descriptionResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
      });

      finalPrompt = descriptionResponse.text;
    } catch(e) {
      console.error("Error generating description from image:", e);
      const message = e instanceof Error ? e.message : "An unknown error occurred";
      throw new Error(`Failed to process uploaded image: ${message}`);
    }
  }
  
  const detailedPrompt = `${finalPrompt}, 16-bit pixel art, detailed character sprite, vibrant color palette, clean outlines, white background`;

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: detailedPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated. The response may have been blocked.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }
};