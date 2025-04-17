
import { pipeline } from "@huggingface/transformers";

// GPU configuration for WebGPU acceleration
const deviceConfig = { device: "webgpu" };

// Cache for the NLP models to avoid reloading
let intentClassifier: any = null;
let responseGenerator: any = null;

// Initialize models
export const initializeModels = async () => {
  try {
    console.log("Initializing NLP models on WebGPU...");
    
    intentClassifier = await pipeline(
      "text-classification",
      "facebook/bart-large-mnli",
      deviceConfig
    );
    
    console.log("Intent classifier loaded successfully");
    
    return true;
  } catch (error) {
    console.error("Error initializing NLP models:", error);
    return false;
  }
};

// Classify the intent of the user message
export const classifyIntent = async (message: string): Promise<string> => {
  if (!intentClassifier) {
    await initializeModels();
  }
  
  try {
    // Labels for intent classification
    const labels = [
      "admission inquiries",
      "course information",
      "fee structure",
      "scholarship information",
      "campus facilities",
      "general inquiry"
    ];

    // If we can't use the model, fallback to keyword matching
    if (!intentClassifier) {
      return classifyIntentByKeywords(message);
    }

    // Classify with the model
    const results = await intentClassifier(message, {
      candidate_labels: labels,
    });

    return results.labels[0];
  } catch (error) {
    console.error("Error classifying intent:", error);
    return classifyIntentByKeywords(message);
  }
};

// Fallback keyword-based intent classification
const classifyIntentByKeywords = (message: string): string => {
  const lowerCaseMessage = message.toLowerCase();
  
  if (lowerCaseMessage.includes("admission") || lowerCaseMessage.includes("apply") || 
      lowerCaseMessage.includes("application") || lowerCaseMessage.includes("enroll")) {
    return "admission inquiries";
  }
  
  if (lowerCaseMessage.includes("course") || lowerCaseMessage.includes("program") ||
      lowerCaseMessage.includes("classes") || lowerCaseMessage.includes("major")) {
    return "course information";
  }
  
  if (lowerCaseMessage.includes("fee") || lowerCaseMessage.includes("tuition") ||
      lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("price")) {
    return "fee structure";
  }
  
  if (lowerCaseMessage.includes("scholarship") || lowerCaseMessage.includes("financial aid") ||
      lowerCaseMessage.includes("grant") || lowerCaseMessage.includes("funding")) {
    return "scholarship information";
  }
  
  if (lowerCaseMessage.includes("campus") || lowerCaseMessage.includes("facilities") ||
      lowerCaseMessage.includes("dorm") || lowerCaseMessage.includes("housing")) {
    return "campus facilities";
  }
  
  return "general inquiry";
};

// Generate response based on intent
export const generateResponse = async (message: string, intent: string): Promise<string> => {
  // College knowledge base responses
  const responses: Record<string, string[]> = {
    "admission inquiries": [
      "Our admission process opens on August 15th each year. You'll need to submit your application, transcripts, and recommendation letters.",
      "Admission requirements include a high school diploma, standardized test scores, and a personal statement.",
      "The application deadline for the fall semester is April 15th, and for the spring semester it's November 1st.",
      "International students need to submit additional documentation including proof of English proficiency."
    ],
    "course information": [
      "We offer over 50 undergraduate programs across sciences, humanities, business, and arts.",
      "Our most popular majors are Computer Science, Business Administration, Psychology, and Engineering.",
      "Each semester consists of 15 weeks of instruction plus a final examination period.",
      "Many courses offer an online or hybrid option for flexible learning."
    ],
    "fee structure": [
      "Undergraduate tuition is $15,000 per semester for in-state students and $25,000 for out-of-state students.",
      "Room and board costs approximately $12,000 per academic year.",
      "Additional fees include a $500 technology fee and a $300 student services fee each semester.",
      "Payment plans are available to help spread the cost over the semester."
    ],
    "scholarship information": [
      "Merit scholarships range from $5,000 to full tuition based on academic achievements.",
      "Need-based financial aid is available through the FAFSA application process.",
      "Departmental scholarships are offered for students excelling in specific fields of study.",
      "The scholarship application deadline is March 1st for the following academic year."
    ],
    "campus facilities": [
      "Our campus includes modern classrooms, research laboratories, a student center, and multiple dining options.",
      "The library is open 24/7 during the academic year and houses over 2 million physical and digital resources.",
      "Recreation facilities include a gym, swimming pool, tennis courts, and intramural fields.",
      "Student housing options range from traditional dormitories to apartment-style residences for upperclassmen."
    ],
    "general inquiry": [
      "Our college is located in a vibrant university town with easy access to cultural and recreational activities.",
      "The academic calendar typically runs from September to May with a winter break in December.",
      "Student-to-faculty ratio is 15:1, ensuring personalized attention and mentorship.",
      "For more specific information, please visit our website or contact the relevant department directly."
    ]
  };
  
  // Select a contextually appropriate response from the knowledge base
  const availableResponses = responses[intent] || responses["general inquiry"];
  const randomIndex = Math.floor(Math.random() * availableResponses.length);
  return availableResponses[randomIndex];
};
