
import { pipeline } from "@huggingface/transformers";

// For WebGPU acceleration
const deviceConfig = { device: "webgpu" as const };

let intentClassifier: any = null;

export const initializeModels = async () => {
  try {
    console.log("Attempting to initialize NLP models...");
    
    try {
      // First try with WebGPU for better performance
      intentClassifier = await pipeline(
        "zero-shot-classification", 
        "Xenova/distilbert-base-uncased-mnli", 
        {
          ...deviceConfig,
          progress_callback: (progressInfo: any) => {
            const progress = progressInfo.status === "progress" ? 
              (typeof progressInfo === 'object' && progressInfo !== null ? 
                (progressInfo as any).value ?? 0 : 0) : 0;
            console.log(`Model loading progress: ${Math.round(progress * 100)}%`);
          }
        }
      );
      
      console.log("Intent classifier loaded successfully");
      return true;
    } catch (error) {
      console.warn("WebGPU acceleration not available, falling back to CPU", error);
      
      // Fall back to CPU if WebGPU isn't available
      intentClassifier = await pipeline(
        "zero-shot-classification", 
        "Xenova/distilbert-base-uncased-mnli",
        {
          progress_callback: (progressInfo: any) => {
            const progress = progressInfo.status === "progress" ? 
              (typeof progressInfo === 'object' && progressInfo !== null ? 
                (progressInfo as any).value ?? 0 : 0) : 0;
            console.log(`CPU model loading progress: ${Math.round(progress * 100)}%`);
          }
        }
      );
      console.log("Intent classifier loaded on CPU");
      return true;
    }
  } catch (error) {
    console.error("Error initializing NLP models:", error);
    return false;
  }
};

// Helper function to get the intent classifier
export const getIntentClassifier = () => intentClassifier;
