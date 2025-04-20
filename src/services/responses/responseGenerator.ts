const responses: Record<string, string[]> = {
  "admission inquiries": [
    "SRM Institute of Science and Technology (SRMIST) offers admissions through SRMJEEE for engineering programs. International students can apply through SRMSAT.",
    "The application process typically starts in November/December each year for the next academic year.",
    "Required documents include 10th and 12th mark sheets, transfer certificate, and valid ID proof. International students need additional documents like passport and visa.",
    "SRMIST follows a holistic admission process considering academic performance, entrance test scores, and other achievements."
  ],
  "course information": [
    "SRMIST offers programs across Engineering, Medicine & Health Sciences, Science & Humanities, and Management studies.",
    "Popular programs include B.Tech in Computer Science, Electronics, Mechanical Engineering, and Biotechnology.",
    "The Medical programs include MBBS, BDS, and various specializations in Health Sciences.",
    "The Management School offers BBA, MBA, and specialized management programs with industry collaboration."
  ],
  "fee structure": [
    "Fee structure varies by program. Engineering programs typically range between ₹2-4 lakhs per year.",
    "Medical and Dental programs have different fee structures, generally higher than engineering programs.",
    "Hostel and accommodation fees are separate and depend on the type of accommodation chosen.",
    "International students have a different fee structure, usually quoted in USD."
  ],
  "scholarship information": [
    "SRMIST offers merit-based scholarships up to 100% tuition fee waiver for outstanding students.",
    "Sports scholarships are available for students with exceptional achievements in sports.",
    "Special scholarships are provided for economically disadvantaged students.",
    "International students can apply for specific international student scholarships."
  ],
  "campus facilities": [
    "SRMIST's main campus is in Kattankulathur, Chennai, with modern infrastructure and state-of-the-art laboratories.",
    "The campus includes a central library, sports facilities, medical center, and separate hostels for boys and girls.",
    "Wi-Fi enabled campus with smart classrooms and research centers.",
    "Multiple campuses across India including Chennai (Kattankulathur, Ramapuram, Vadapalani) and NCR."
  ],
  "general inquiry": [
    "SRM Institute of Science and Technology is a leading private university in India, established in 1985.",
    "SRMIST is NAAC accredited with 'A++' grade and ranked among top institutions by NIRF.",
    "The university has strong industry connections and a proven placement record with leading companies.",
    "Research centers at SRMIST focus on emerging technologies and sustainable development."
  ]
};

export const generateResponse = async (message: string, intent: string): Promise<string> => {
  const lowerCaseMessage = message.toLowerCase();
  
  if (intent === "admission inquiries") {
    if (lowerCaseMessage.includes("deadline") || lowerCaseMessage.includes("when")) {
      return "The application process typically starts in November/December each year for the next academic year.";
    } else if (lowerCaseMessage.includes("requirement") || lowerCaseMessage.includes("need") || lowerCaseMessage.includes("document")) {
      return "Required documents include 10th and 12th mark sheets, transfer certificate, and valid ID proof. International students need additional documents like passport and visa.";
    } else if (lowerCaseMessage.includes("process") || lowerCaseMessage.includes("how") || lowerCaseMessage.includes("apply")) {
      return "SRMIST follows a holistic admission process considering academic performance, entrance test scores, and other achievements.";
    }
  } else if (intent === "course information") {
    if (lowerCaseMessage.includes("computer science") || lowerCaseMessage.includes("cs") || lowerCaseMessage.includes("programming")) {
      return "Popular programs include B.Tech in Computer Science, Electronics, Mechanical Engineering, and Biotechnology.";
    } else if (lowerCaseMessage.includes("business") || lowerCaseMessage.includes("management") || lowerCaseMessage.includes("mba")) {
      return "The Management School offers BBA, MBA, and specialized management programs with industry collaboration.";
    } else if (lowerCaseMessage.includes("online") || lowerCaseMessage.includes("remote") || lowerCaseMessage.includes("distance")) {
      return "SRMIST offers flexible learning options including fully online degrees in Business, Psychology, and Computer Science.";
    }
  } else if (intent === "fee structure") {
    if (lowerCaseMessage.includes("payment plan") || lowerCaseMessage.includes("installment")) {
      return "Yes, we offer flexible payment plans that allow you to pay your tuition in monthly installments.";
    } else if (lowerCaseMessage.includes("international") || lowerCaseMessage.includes("foreign")) {
      return "International student tuition is ₹2-4 lakhs per year.";
    } else if (lowerCaseMessage.includes("total") || lowerCaseMessage.includes("overall") || lowerCaseMessage.includes("all")) {
      return "The estimated total cost of attendance per academic year, including tuition, fees, room and board, books, and personal expenses is approximately ₹35,000 for in-state students and ₹55,000 for out-of-state students.";
    }
  }
  
  const availableResponses = responses[intent] || responses["general inquiry"];
  const randomIndex = Math.floor(Math.random() * availableResponses.length);
  return availableResponses[randomIndex];
};
