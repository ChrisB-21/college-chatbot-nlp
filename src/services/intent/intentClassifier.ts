
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
    
    // If model isn't loaded or we encounter issues, fall back to keyword classification
    if (!classifier) {
      console.log("Using keyword-based intent classification as fallback");
      return classifyIntentByKeywords(message);
    }

    try {
      const results = await classifier(message, {
        candidate_labels: labels,
      });

      console.log("Intent classification results:", results);

      // Fix: Extract the proper label from the results
      if (results && Array.isArray(results.labels) && results.labels.length > 0) {
        return results.labels[0];
      } else if (results && typeof results.labels === 'object' && results.scores && Array.isArray(results.scores)) {
        // If the structure is different than expected, try to find the highest scoring label
        const highestScoreIndex = results.scores.indexOf(Math.max(...results.scores));
        if (highestScoreIndex >= 0 && highestScoreIndex < labels.length) {
          return labels[highestScoreIndex];
        }
      }
      
      // If we can't extract a label from the model output, use keyword matching
      console.log("Falling back to keyword classification due to unexpected model output format");
      return classifyIntentByKeywords(message);
    } catch (classifierError) {
      console.error("Error during model-based classification:", classifierError);
      return classifyIntentByKeywords(message);
    }
  } catch (error) {
    console.error("Error in intent classification process:", error);
    return classifyIntentByKeywords(message);
  }
};
