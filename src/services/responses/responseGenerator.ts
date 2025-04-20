
const responses: Record<string, string[]> = {
  "admission inquiries": [
    "SRM Institute of Science and Technology (SRMIST) offers admissions through SRMJEEE (SRM Joint Engineering Entrance Examination) for engineering programs. You can apply at www.srmist.edu.in. The application process typically starts in November each year.",
    "For admission to SRMIST, you need to take the SRMJEEE entrance exam or have valid scores from JEE Main. The eligibility requirement is 60% in PCM for most engineering programs.",
    "SRMIST's admission process includes online application, entrance exam, counseling for program selection, and fee payment. International students can apply through SRMSAT.",
    "Required documents for SRMIST admission include 10th and 12th mark sheets, transfer certificate, and valid ID proof. International students need additional documents like passport and visa."
  ],
  "course information": [
    "SRMIST offers B.Tech programs in Computer Science, Electronics, Mechanical, Civil, and Aerospace Engineering, as well as specialized programs in AI, Data Science, and IoT.",
    "The Faculty of Medicine and Health Sciences at SRMIST offers MBBS, BDS, Nursing, Pharmacy, and various Allied Health Science programs with state-of-the-art medical facilities.",
    "SRMIST's School of Management offers BBA and MBA programs with specializations in Marketing, Finance, HR, Business Analytics, and International Business.",
    "The Faculty of Science and Humanities at SRMIST offers undergraduate and postgraduate programs in Physics, Chemistry, Mathematics, English, Psychology, and Journalism."
  ],
  "fee structure": [
    "Engineering programs at SRMIST typically range between ₹2.25-3.75 lakhs per year depending on the specialization and campus chosen.",
    "Medical and Dental programs at SRMIST have different fee structures, generally ranging from ₹5-20 lakhs per year depending on the program.",
    "Management programs like MBA at SRMIST cost approximately ₹2-3 lakhs per year, with additional fees for international immersion programs.",
    "SRMIST offers flexible payment plans and semester-wise fee payment options. Some programs also offer EMI options through partner banks."
  ],
  "scholarship information": [
    "SRMIST offers merit scholarships up to 100% tuition fee waiver for students with exceptional academic performance in board exams or entrance tests.",
    "Sports scholarships at SRMIST are available for students who have represented at state, national, or international levels in recognized sports.",
    "SRMIST provides special category scholarships for economically disadvantaged students and those from rural backgrounds through various government and institutional schemes.",
    "Research scholarships and fellowships are available at SRMIST for Ph.D. students and those engaged in sponsored research projects."
  ],
  "campus facilities": [
    "SRMIST's main campus in Kattankulathur, Chennai spans over 250 acres with modern infrastructure including AC classrooms, research centers, innovation hubs, and recreational facilities.",
    "Hostel facilities at SRMIST include separate accommodations for boys and girls with options ranging from standard to premium rooms, all with Wi-Fi connectivity, common rooms, and dining facilities.",
    "SRMIST campuses feature sports facilities including cricket grounds, basketball courts, tennis courts, swimming pools, fitness centers, and indoor games areas.",
    "The central library at SRMIST houses over 100,000 books, journals, and digital resources with spacious reading areas, computer labs, and access to international databases."
  ],
  "placement information": [
    "SRMIST has a dedicated Placement Cell that facilitates campus recruitment with over 600+ companies visiting annually including Microsoft, Amazon, Google, and other top recruiters.",
    "The average salary package for SRMIST graduates ranges from ₹4-6 lakhs per annum, with top packages going as high as ₹42 lakhs per annum for exceptional students.",
    "SRMIST's School of Engineering has particularly strong placement statistics with over 85% of eligible students getting placed in reputed companies.",
    "SRMIST offers pre-placement training including aptitude tests, technical assessments, mock interviews, and soft skills development to prepare students for successful placements."
  ],
  "general inquiry": [
    "SRM Institute of Science and Technology (SRMIST) is a leading private university in India established in 1985, with NAAC A++ accreditation and ranked among the top institutions by NIRF.",
    "SRMIST has multiple campuses across India, with the main campus in Kattankulathur (Chennai), and other campuses in Ramapuram, Vadapalani, Delhi-NCR, and Amaravati.",
    "The university offers a wide range of programs in Engineering, Medicine, Management, Science, and Humanities at undergraduate, postgraduate, and doctoral levels.",
    "SRMIST has strong international collaborations with over 150+ global universities, offering semester abroad programs, dual degree options, student exchange, and international internships."
  ]
};

export const generateResponse = async (message: string, intent: string): Promise<string> => {
  const lowerCaseMessage = message.toLowerCase();
  const words = lowerCaseMessage.split(/\s+/);
  
  // Debug the intent we're working with
  console.log(`Generating response for intent: ${intent}`);
  
  // Ensure we have a valid intent
  let safeIntent = intent;
  if (!responses[safeIntent]) {
    console.warn(`Unknown intent provided: ${intent}, falling back to general inquiry`);
    safeIntent = "general inquiry";
  }
  
  // Look for specific keywords in the message to provide more targeted responses
  if (safeIntent === "admission inquiries") {
    if (lowerCaseMessage.includes("deadline") || lowerCaseMessage.includes("when") || lowerCaseMessage.includes("date")) {
      return "The application process for SRMIST typically starts in November/December each year for the next academic year. The SRMJEEE exam is usually conducted in April, with results announced by May. Admission offers are made shortly after based on merit and counseling.";
    } else if (lowerCaseMessage.includes("requirement") || lowerCaseMessage.includes("need") || lowerCaseMessage.includes("document") || lowerCaseMessage.includes("eligibility")) {
      return "For SRMIST admissions, you need: 1) Completed application form, 2) 10th and 12th mark sheets (minimum 60% in PCM for engineering), 3) Valid ID proof, 4) Recent passport-sized photographs, and 5) Application fee payment receipt. International students need additional documents like passport copy, visa, and English proficiency test scores.";
    } else if (lowerCaseMessage.includes("process") || lowerCaseMessage.includes("how") || lowerCaseMessage.includes("apply") || lowerCaseMessage.includes("steps")) {
      return "The SRMIST admission process involves: 1) Register online at www.srmist.edu.in, 2) Fill the application form and pay the fee, 3) Take the SRMJEEE entrance exam or submit JEE/other accepted scores, 4) Await results and counseling call, 5) Attend counseling, select your program, and pay the initial fee to secure your seat.";
    } else if (lowerCaseMessage.includes("srmjeee") || lowerCaseMessage.includes("entrance") || lowerCaseMessage.includes("exam") || lowerCaseMessage.includes("test")) {
      return "SRMJEEE is the entrance exam for engineering programs at SRMIST. It tests Physics, Chemistry, and Mathematics (PCM). The computer-based test lasts 2.5 hours with 125 multiple-choice questions. Practice tests are available on the official website. SRMIST also accepts JEE Main scores for direct admission based on rank.";
    }
  } else if (safeIntent === "course information") {
    if (lowerCaseMessage.includes("computer science") || lowerCaseMessage.includes("cs") || lowerCaseMessage.includes("programming") || lowerCaseMessage.includes("it")) {
      return "SRMIST offers B.Tech in Computer Science Engineering with various specializations including AI & Machine Learning, Data Science, Cybersecurity, IoT, and Cloud Computing. The 4-year program includes industry internships, capstone projects, and opportunities for research. The department has state-of-the-art labs and strong industry connections with companies like Microsoft, Google, and IBM.";
    } else if (lowerCaseMessage.includes("business") || lowerCaseMessage.includes("management") || lowerCaseMessage.includes("mba") || lowerCaseMessage.includes("bba")) {
      return "The SRM School of Management offers BBA and MBA programs with specializations in Marketing, Finance, HR, Operations, Business Analytics, and International Business. The program features case-based learning, industry mentorship, international exchange programs, and Bloomberg terminal access for real-world financial analysis training.";
    } else if (lowerCaseMessage.includes("engineering") || lowerCaseMessage.includes("b.tech") || lowerCaseMessage.includes("m.tech")) {
      return "SRMIST's Faculty of Engineering offers B.Tech and M.Tech programs across various disciplines including Mechanical, Civil, Electrical, Electronics, Aerospace, Automobile, Biomedical, Chemical, and more. All programs feature practical training, industry projects, and access to advanced research facilities. Several programs offer international university collaborations.";
    } else if (lowerCaseMessage.includes("medical") || lowerCaseMessage.includes("mbbs") || lowerCaseMessage.includes("health") || lowerCaseMessage.includes("doctor")) {
      return "SRM Medical College Hospital and Research Centre offers MBBS, MD/MS, BDS, Nursing, Allied Health Sciences, and Pharmacy programs. The medical campus features a 1500-bed teaching hospital, advanced diagnostic equipment, simulation labs, and specialized research centers. The programs are recognized by NMC (formerly MCI) and follow global medical education standards.";
    }
  } else if (safeIntent === "fee structure") {
    if (lowerCaseMessage.includes("payment plan") || lowerCaseMessage.includes("installment") || lowerCaseMessage.includes("emi")) {
      return "SRMIST offers flexible payment plans allowing students to pay tuition in semester-wise installments. Some programs also offer EMI options through partner banks. There's an initial registration fee followed by semester payments. Special arrangements can be discussed with the Finance Office for students with financial constraints.";
    } else if (lowerCaseMessage.includes("international") || lowerCaseMessage.includes("foreign") || lowerCaseMessage.includes("nri")) {
      return "International student tuition at SRMIST ranges from $5,000-$10,000 per year depending on the program. NRI students have a separate fee structure. This includes tuition but excludes accommodation, meals, and insurance. International student services provide assistance with banking, accommodation, and visa extension.";
    } else if (lowerCaseMessage.includes("engineering") || lowerCaseMessage.includes("b.tech")) {
      return "For B.Tech programs at SRMIST, the annual tuition ranges from ₹2.25-3.75 lakhs depending on the branch and campus. Computer Science, AI specializations, and Data Science programs typically have higher fees. Additional costs include one-time admission fee (₹25,000), examination fee (₹20,000/year), and hostel charges if applicable.";
    } else if (lowerCaseMessage.includes("medical") || lowerCaseMessage.includes("mbbs")) {
      return "MBBS program at SRMIST costs approximately ₹15-20 lakhs per annum. Dental (BDS) program costs around ₹6-9 lakhs per annum. These programs have additional fees for lab usage, clinical training, and medical equipment. Scholarship opportunities are available for meritorious students.";
    }
  } else if (safeIntent === "placement information") {
    if (lowerCaseMessage.includes("salary") || lowerCaseMessage.includes("package") || lowerCaseMessage.includes("ctc")) {
      return "At SRMIST, the average salary package ranges from ₹4-6 lakhs per annum across programs. Top performers receive packages of ₹10-42 lakhs. Computer Science and IT programs typically see higher average packages of ₹6-8 lakhs. The highest packages are usually offered by global tech giants and financial institutions.";
    } else if (lowerCaseMessage.includes("company") || lowerCaseMessage.includes("recruiter") || lowerCaseMessage.includes("who")) {
      return "Over 600+ companies recruit from SRMIST including tech giants (Microsoft, Google, Amazon, IBM), consulting firms (Deloitte, PwC, EY), core engineering companies (L&T, Honeywell, Siemens), financial institutions (HDFC, ICICI), and numerous startups. The Career Development Center maintains strong relationships with industry partners to ensure excellent placement opportunities.";
    } else if (lowerCaseMessage.includes("internship") || lowerCaseMessage.includes("training")) {
      return "SRMIST has a robust internship program with 85% of students securing internships in reputed organizations. Many internships are paid and can lead to pre-placement offers. The university has dedicated internship coordinators and an industry interface program that facilitates real-world training opportunities throughout the academic journey.";
    } else if (lowerCaseMessage.includes("percentage") || lowerCaseMessage.includes("stats") || lowerCaseMessage.includes("rate")) {
      return "SRMIST boasts impressive placement statistics with over 85% of eligible students receiving job offers. Computer Science and related programs often achieve 95%+ placement rates. The placement process begins in the pre-final year with pre-placement training, followed by multiple recruitment drives throughout the year.";
    }
  }
  
  // If no specific match was found, analyze the query to find the most relevant response
  const availableResponses = responses[safeIntent];
  
  // Check if we have any responses for this intent
  if (!availableResponses || availableResponses.length === 0) {
    console.warn(`No responses available for intent: ${safeIntent}`);
    return "I'm sorry, but I don't have specific information about that. Please try asking another question about SRM University's admissions, courses, fees, scholarships, campus facilities, or placements.";
  }
  
  // Return a random response from the appropriate category
  const randomIndex = Math.floor(Math.random() * availableResponses.length);
  return availableResponses[randomIndex];
};
