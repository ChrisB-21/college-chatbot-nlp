import { pipeline } from "@huggingface/transformers";

// GPU configuration for WebGPU acceleration
const deviceConfig = { device: "webgpu" as const };

// Cache for the NLP models to avoid reloading
let intentClassifier: any = null;
let responseGenerator: any = null;

// WebGPU diagnostics function
export const checkWebGPUCompatibility = async (): Promise<{
  isSupported: boolean;
  adapterInfo?: any;
  errorMessage?: string;
}> => {
  try {
    // Check if the navigator.gpu exists (basic WebGPU support check)
    if (!navigator.gpu) {
      return {
        isSupported: false,
        errorMessage: "WebGPU is not supported in this browser. Try using Chrome 113+ or Chrome Canary."
      };
    }

    // Try to request an adapter which will succeed only if hardware supports WebGPU
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      return {
        isSupported: false,
        errorMessage: "WebGPU adapter could not be requested. Your GPU may not be compatible or WebGPU may be disabled."
      };
    }

    // Get adapter info
    let adapterInfo = { vendor: "Unknown", architecture: "Unknown", device: "Unknown", description: "GPU information unavailable" };
    
    try {
      if (adapter.requestAdapterInfo && typeof adapter.requestAdapterInfo === 'function') {
        adapterInfo = await adapter.requestAdapterInfo();
      }
    } catch (infoError) {
      console.warn("Could not get adapter info:", infoError);
    }
    
    return {
      isSupported: true,
      adapterInfo
    };
  } catch (error) {
    return {
      isSupported: false,
      errorMessage: `Error checking WebGPU compatibility: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

// Initialize models
export const initializeModels = async () => {
  try {
    console.log("Attempting to initialize NLP models on WebGPU...");
    
    // Use a more reliable and smaller model for intent classification
    intentClassifier = await pipeline(
      "zero-shot-classification", 
      "facebook/bart-large-mnli", 
      {
        ...deviceConfig,
        quantized: true // Use quantized model for better performance
      }
    );
    
    console.log("Intent classifier loaded successfully on WebGPU");
    return true;
  } catch (error) {
    console.error("Error initializing NLP models:", error);
    
    try {
      // Fallback to CPU if WebGPU initialization fails
      console.log("Falling back to CPU model initialization...");
      intentClassifier = await pipeline(
        "zero-shot-classification", 
        "facebook/bart-large-mnli"
      );
      
      console.warn("Models loaded on CPU due to WebGPU initialization failure");
      return false;
    } catch (fallbackError) {
      console.error("Failed to initialize models even on CPU:", fallbackError);
      return false;
    }
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

// Generate response based on intent
export const generateResponse = async (message: string, intent: string): Promise<string> => {
  // Analyze the user's query to extract key topics and context
  const lowerCaseMessage = message.toLowerCase();
  
  // College knowledge base responses
  const responses: Record<string, string[]> = {
    "admission inquiries": [
      "Our admission process opens on August 15th each year. You'll need to submit your application, transcripts, and recommendation letters.",
      "Admission requirements include a high school diploma, standardized test scores (SAT/ACT), and a personal statement.",
      "The application deadline for the fall semester is April 15th, and for the spring semester it's November 1st.",
      "International students need to submit additional documentation including proof of English proficiency (TOEFL or IELTS)."
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
  
  // Select a more contextually appropriate response based on the query
  if (intent === "admission inquiries") {
    if (lowerCaseMessage.includes("deadline") || lowerCaseMessage.includes("when")) {
      return "The application deadline for the fall semester is April 15th, and for the spring semester it's November 1st. Early decision applications are due by November 15th.";
    } else if (lowerCaseMessage.includes("requirement") || lowerCaseMessage.includes("need") || lowerCaseMessage.includes("document")) {
      return "Admission requirements include a high school diploma, standardized test scores (SAT/ACT), a personal statement, and two letters of recommendation. International students also need to submit proof of English proficiency.";
    } else if (lowerCaseMessage.includes("process") || lowerCaseMessage.includes("how") || lowerCaseMessage.includes("apply")) {
      return "Our admission process is straightforward: complete the online application form, submit all required documents, pay the application fee ($50), and schedule an interview (optional but recommended). The admissions committee will review your application and notify you of their decision within 4-6 weeks.";
    }
  } else if (intent === "course information") {
    if (lowerCaseMessage.includes("computer science") || lowerCaseMessage.includes("cs") || lowerCaseMessage.includes("programming")) {
      return "Our Computer Science program offers specializations in artificial intelligence, cybersecurity, data science, and software engineering. The program includes hands-on projects, internship opportunities, and access to cutting-edge computing facilities.";
    } else if (lowerCaseMessage.includes("business") || lowerCaseMessage.includes("management") || lowerCaseMessage.includes("mba")) {
      return "The Business Administration program covers finance, marketing, operations, entrepreneurship, and management. Students participate in case studies, business simulations, and have opportunities to network with industry professionals.";
    } else if (lowerCaseMessage.includes("online") || lowerCaseMessage.includes("remote") || lowerCaseMessage.includes("distance")) {
      return "We offer flexible learning options including fully online degrees in Business, Psychology, and Computer Science. Our online courses use the same curriculum as on-campus courses and provide interactive virtual classrooms, discussion forums, and personalized support.";
    }
  } else if (intent === "fee structure") {
    if (lowerCaseMessage.includes("payment plan") || lowerCaseMessage.includes("installment")) {
      return "Yes, we offer flexible payment plans that allow you to pay your tuition in monthly installments. The standard plan divides your semester costs into 4 equal payments with no interest charges, only a small setup fee of $35.";
    } else if (lowerCaseMessage.includes("international") || lowerCaseMessage.includes("foreign")) {
      return "International student tuition is $27,500 per semester. Additional fees include a one-time international student service fee of $250 and mandatory international health insurance at $1,200 per year.";
    } else if (lowerCaseMessage.includes("total") || lowerCaseMessage.includes("overall") || lowerCaseMessage.includes("all")) {
      return "The estimated total cost of attendance per academic year, including tuition, fees, room and board, books, and personal expenses is approximately $35,000 for in-state students and $55,000 for out-of-state students.";
    }
  }
  
  // Default to selecting a random response for the intent if no specific context match
  const availableResponses = responses[intent] || responses["general inquiry"];
  const randomIndex = Math.floor(Math.random() * availableResponses.length);
  return availableResponses[randomIndex];
};
