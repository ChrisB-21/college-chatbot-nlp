import { getIntentClassifier } from '../models/modelInitializer';

const classifyIntentByKeywords = (message: string): string => {
  const lowerCaseMessage = message.toLowerCase();
  
  // Enhanced keyword matching for better intent classification
  if (lowerCaseMessage.includes("admission") || lowerCaseMessage.includes("apply") || 
      lowerCaseMessage.includes("application") || lowerCaseMessage.includes("enroll") ||
      lowerCaseMessage.includes("entrance") || lowerCaseMessage.includes("how to join") ||
      lowerCaseMessage.includes("how to get in") || lowerCaseMessage.includes("srmjeee") ||
      lowerCaseMessage.includes("eligibility") || lowerCaseMessage.includes("qualify")) {
    return "admission inquiries";
  }
  
  if (lowerCaseMessage.includes("course") || lowerCaseMessage.includes("program") ||
      lowerCaseMessage.includes("classes") || lowerCaseMessage.includes("major") ||
      lowerCaseMessage.includes("study") || lowerCaseMessage.includes("degree") ||
      lowerCaseMessage.includes("branch") || lowerCaseMessage.includes("subjects") ||
      lowerCaseMessage.includes("b.tech") || lowerCaseMessage.includes("m.tech") ||
      lowerCaseMessage.includes("bba") || lowerCaseMessage.includes("mba") ||
      lowerCaseMessage.includes("department") || lowerCaseMessage.includes("specialization")) {
    return "course information";
  }
  
  if (lowerCaseMessage.includes("fee") || lowerCaseMessage.includes("tuition") ||
      lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("price") ||
      lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("expensive") ||
      lowerCaseMessage.includes("how much") || lowerCaseMessage.includes("semester fee") ||
      lowerCaseMessage.includes("annual fee") || lowerCaseMessage.includes("charges") ||
      lowerCaseMessage.includes("pay")) {
    return "fee structure";
  }
  
  if (lowerCaseMessage.includes("scholarship") || lowerCaseMessage.includes("financial aid") ||
      lowerCaseMessage.includes("grant") || lowerCaseMessage.includes("funding") ||
      lowerCaseMessage.includes("aid") || lowerCaseMessage.includes("merit") ||
      lowerCaseMessage.includes("discount") || lowerCaseMessage.includes("waiver") ||
      lowerCaseMessage.includes("financial support") || lowerCaseMessage.includes("stipend")) {
    return "scholarship information";
  }
  
  if (lowerCaseMessage.includes("campus") || lowerCaseMessage.includes("facilities") ||
      lowerCaseMessage.includes("dorm") || lowerCaseMessage.includes("housing") ||
      lowerCaseMessage.includes("library") || lowerCaseMessage.includes("building") ||
      lowerCaseMessage.includes("hostel") || lowerCaseMessage.includes("accommodation") ||
      lowerCaseMessage.includes("infrastructure") || lowerCaseMessage.includes("location") ||
      lowerCaseMessage.includes("where is") || lowerCaseMessage.includes("address") ||
      lowerCaseMessage.includes("lab") || lowerCaseMessage.includes("wifi")) {
    return "campus facilities";
  }
  
  if (lowerCaseMessage.includes("placement") || lowerCaseMessage.includes("job") ||
      lowerCaseMessage.includes("salary") || lowerCaseMessage.includes("career") ||
      lowerCaseMessage.includes("company") || lowerCaseMessage.includes("recruit") ||
      lowerCaseMessage.includes("employment") || lowerCaseMessage.includes("internship") ||
      lowerCaseMessage.includes("package") || lowerCaseMessage.includes("hiring") ||
      lowerCaseMessage.includes("opportunity")) {
    return "placement information";
  }
  
  return "general inquiry";
};

export const classifyIntent = async (message: string): Promise<string> => {
  try {
    // Always use keyword classification as our primary method for better accuracy
    const keywordIntent = classifyIntentByKeywords(message);
    
    // If we have a specific intent from keywords, use it directly
    if (keywordIntent !== "general inquiry") {
      console.log(`Using keyword-based intent: ${keywordIntent}`);
      return keywordIntent;
    }
    
    // Otherwise, attempt to use the model as a fallback
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
      console.log("Model not available, using keyword classification");
      return keywordIntent;
    }

    try {
      const results = await classifier(message, {
        candidate_labels: labels,
      });

      console.log("Intent classification results:", results);
      
      // Fix: More robust handling of results
      if (results && typeof results === 'object') {
        // Try to find the highest scoring label
        if (Array.isArray(results.scores) && Array.isArray(results.labels)) {
          // Find the index of the highest score
          const highestScoreIndex = results.scores.indexOf(Math.max(...results.scores));
          if (highestScoreIndex >= 0 && highestScoreIndex < results.labels.length) {
            const modelIntent = results.labels[highestScoreIndex];
            console.log(`Using model-based intent: ${modelIntent}`);
            return modelIntent;
          }
        }
      }
      
      // If model results are invalid, fall back to keyword classification
      console.log(`Falling back to keyword classification: ${keywordIntent}`);
      return keywordIntent;
    } catch (classifierError) {
      console.error("Error during model-based classification:", classifierError);
      return keywordIntent;
    }
  } catch (error) {
    console.error("Error in intent classification process:", error);
    return classifyIntentByKeywords(message);
  }
};
