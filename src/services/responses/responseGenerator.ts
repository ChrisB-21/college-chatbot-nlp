
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

export const generateResponse = async (message: string, intent: string): Promise<string> => {
  const lowerCaseMessage = message.toLowerCase();
  
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
  
  const availableResponses = responses[intent] || responses["general inquiry"];
  const randomIndex = Math.floor(Math.random() * availableResponses.length);
  return availableResponses[randomIndex];
};
