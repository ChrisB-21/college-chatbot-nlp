
import { initializeModels, getIntentClassifier } from '../models/modelInitializer';

const classifyIntentByKeywords = (message: string): string => {
  const lowerCaseMessage = message.toLowerCase();
  
  // Enhanced keyword matching for better intent classification
  if (lowerCaseMessage.includes("admission") || lowerCaseMessage.includes("apply") || 
      lowerCaseMessage.includes("application") || lowerCaseMessage.includes("enroll") ||
      lowerCaseMessage.includes("entrance") || lowerCaseMessage.includes("how to join") ||
      lowerCaseMessage.includes("how to get in") || lowerCaseMessage.includes("srmjeee")) {
    return "admission inquiries";
  }
  
  if (lowerCaseMessage.includes("course") || lowerCaseMessage.includes("program") ||
      lowerCaseMessage.includes("classes") || lowerCaseMessage.includes("major") ||
      lowerCaseMessage.includes("study") || lowerCaseMessage.includes("degree") ||
      lowerCaseMessage.includes("branch") || lowerCaseMessage.includes("subjects") ||
      lowerCaseMessage.includes("b.tech") || lowerCaseMessage.includes("m.tech") ||
      lowerCaseMessage.includes("bba") || lowerCaseMessage.includes("mba")) {
    return "course information";
  }
  
  if (lowerCaseMessage.includes("fee") || lowerCaseMessage.includes("tuition") ||
      lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("price") ||
      lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("expensive") ||
      lowerCaseMessage.includes("how much") || lowerCaseMessage.includes("semester fee") ||
      lowerCaseMessage.includes("annual fee")) {
    return "fee structure";
  }
  
  if (lowerCaseMessage.includes("scholarship") || lowerCaseMessage.includes("financial aid") ||
      lowerCaseMessage.includes("grant") || lowerCaseMessage.includes("funding") ||
      lowerCaseMessage.includes("aid") || lowerCaseMessage.includes("merit") ||
      lowerCaseMessage.includes("discount") || lowerCaseMessage.includes("waiver")) {
    return "scholarship information";
  }
  
  if (lowerCaseMessage.includes("campus") || lowerCaseMessage.includes("facilities") ||
      lowerCaseMessage.includes("dorm") || lowerCaseMessage.includes("housing") ||
      lowerCaseMessage.includes("library") || lowerCaseMessage.includes("building") ||
      lowerCaseMessage.includes("hostel") || lowerCaseMessage.includes("accommodation") ||
      lowerCaseMessage.includes("infrastructure") || lowerCaseMessage.includes("location") ||
      lowerCaseMessage.includes("where is") || lowerCaseMessage.includes("address")) {
    return "campus facilities";
  }
  
  if (lowerCaseMessage.includes("placement") || lowerCaseMessage.includes("job") ||
      lowerCaseMessage.includes("salary") || lowerCaseMessage.includes("career") ||
      lowerCaseMessage.includes("company") || lowerCaseMessage.includes("recruit") ||
      lowerCaseMessage.includes("employment") || lowerCaseMessage.includes("internship")) {
    return "placement information";
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
      "placement information",
      "general inquiry"
    ];

    const classifier = getIntentClassifier();
    if (!classifier) {
      return classifyIntentByKeywords(message);
    }

    const results = await classifier(message, {
      candidate_labels: labels,
    });

    console.log("Intent classification results:", results);

    // Make sure we return a string, not the entire results object
    if (results && results.labels && results.labels.length > 0) {
      return results.labels[0];
    } else {
      console.error("Unexpected classifier results format:", results);
      return classifyIntentByKeywords(message);
    }
  } catch (error) {
    console.error("Error classifying intent:", error);
    return classifyIntentByKeywords(message);
  }
};
