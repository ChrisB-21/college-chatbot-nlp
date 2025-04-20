
import { initializeModels, getIntentClassifier } from '../models/modelInitializer';

const classifyIntentByKeywords = (message: string): string => {
  const lowerCaseMessage = message.toLowerCase();
  
  if (lowerCaseMessage.includes("admission") || lowerCaseMessage.includes("apply") || 
      lowerCaseMessage.includes("application") || lowerCaseMessage.includes("enroll")) {
    return "admission inquiries";
  }
  
  if (lowerCaseMessage.includes("course") || lowerCaseMessage.includes("program") ||
      lowerCaseMessage.includes("classes") || lowerCaseMessage.includes("major") ||
      lowerCaseMessage.includes("study") || lowerCaseMessage.includes("degree")) {
    return "course information";
  }
  
  if (lowerCaseMessage.includes("fee") || lowerCaseMessage.includes("tuition") ||
      lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("price") ||
      lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("expensive")) {
    return "fee structure";
  }
  
  if (lowerCaseMessage.includes("scholarship") || lowerCaseMessage.includes("financial aid") ||
      lowerCaseMessage.includes("grant") || lowerCaseMessage.includes("funding") ||
      lowerCaseMessage.includes("aid") || lowerCaseMessage.includes("merit")) {
    return "scholarship information";
  }
  
  if (lowerCaseMessage.includes("campus") || lowerCaseMessage.includes("facilities") ||
      lowerCaseMessage.includes("dorm") || lowerCaseMessage.includes("housing") ||
      lowerCaseMessage.includes("library") || lowerCaseMessage.includes("building")) {
    return "campus facilities";
  }
  
  return "general inquiry";
};

export const classifyIntent = async (message: string): Promise<string> => {
  const intentClassifier = getIntentClassifier();
  if (!intentClassifier) {
    await initializeModels();
  }
  
  try {
    const labels = [
      "admission inquiries",
      "course information",
      "fee structure",
      "scholarship information",
      "campus facilities",
      "general inquiry"
    ];

    if (!intentClassifier) {
      return classifyIntentByKeywords(message);
    }

    const results = await intentClassifier(message, {
      candidate_labels: labels,
    });

    return results.labels[0];
  } catch (error) {
    console.error("Error classifying intent:", error);
    return classifyIntentByKeywords(message);
  }
};
