
import { pipeline } from "@huggingface/transformers";
import type { Pipeline } from "@huggingface/transformers";

// GPU configuration for WebGPU acceleration
const deviceConfig = { device: "webgpu" as const };

let intentClassifier: any = null;

export const initializeModels = async () => {
  try {
    console.log("Attempting to initialize NLP models on WebGPU...");
    
    sessionStorage.removeItem('model_load_error');
    sessionStorage.removeItem('model_load_success');
    
    try {
      intentClassifier = await pipeline(
        "zero-shot-classification", 
        "Xenova/distilbert-base-uncased-mnli", 
        {
          ...deviceConfig,
          progress_callback: (progressInfo) => {
            // Fix TypeScript error by safely accessing progress
            const progress = progressInfo.status === "progress" ? 
              (typeof progressInfo === 'object' && progressInfo !== null ? 
                (progressInfo as any).value ?? 0 : 0) : 0;
            console.log(`Model loading progress: ${Math.round(progress * 100)}%`);
          }
        }
      );
      
      console.log("Intent classifier loaded successfully on WebGPU");
      sessionStorage.setItem('model_load_success', 'true');
      return true;
    } catch (webgpuError) {
      console.error("Error loading model on WebGPU:", webgpuError);
      sessionStorage.setItem('model_load_error', 
        webgpuError instanceof Error 
          ? webgpuError.message 
          : 'Failed to load model from Hugging Face. Check your network connection and browser console for details.'
      );
      
      try {
        console.log("Attempting to load model on CPU instead...");
        intentClassifier = await pipeline(
          "zero-shot-classification", 
          "Xenova/distilbert-base-uncased-mnli",
          {
            progress_callback: (progressInfo) => {
              // Fix TypeScript error by safely accessing progress
              const progress = progressInfo.status === "progress" ? 
                (typeof progressInfo === 'object' && progressInfo !== null ? 
                  (progressInfo as any).value ?? 0 : 0) : 0;
              console.log(`CPU model loading progress: ${Math.round(progress * 100)}%`);
            }
          }
        );
        console.warn("Models loaded on CPU due to WebGPU initialization failure");
        return false;
      } catch (cpuError) {
        console.error("Failed to initialize models even on CPU:", cpuError);
        sessionStorage.setItem('model_load_error', 
          'Failed to load model even on CPU. This may be due to network issues or CORS restrictions.'
        );
        return false;
      }
    }
  } catch (error) {
    console.error("Error initializing NLP models:", error);
    sessionStorage.setItem('model_load_error', 
      error instanceof Error ? error.message : 'Unknown error initializing models'
    );
    return false;
  }
};

export const getIntentClassifier = () => intentClassifier;
