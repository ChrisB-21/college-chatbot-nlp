
const responses: Record<string, string[]> = {
  "admission inquiries": [
    "SRM Institute of Science and Technology (SRMIST) offers admissions through SRMJEEE (SRM Joint Engineering Entrance Examination) for engineering programs. International students can apply through SRMSAT.",
    "The application process for SRMIST typically starts in November/December each year for the next academic year. The SRMJEEE exam is usually conducted in April.",
    "Required documents for SRMIST admission include 10th and 12th mark sheets, transfer certificate, and valid ID proof. International students need additional documents like passport and visa.",
    "SRMIST follows a holistic admission process considering academic performance, entrance test scores, and other achievements. You can apply online through the official website www.srmist.edu.in."
  ],
  "course information": [
    "SRM Institute of Science and Technology offers programs across Engineering, Medicine & Health Sciences, Science & Humanities, and Management studies.",
    "SRMIST's popular programs include B.Tech in Computer Science, Electronics, Mechanical Engineering, and Biotechnology with specializations in AI, Data Science, and IoT.",
    "The Medical programs at SRMIST include MBBS, BDS, Nursing, Physiotherapy, and various specializations in Health Sciences.",
    "The Management School at SRMIST offers BBA, MBA, and specialized management programs with industry collaboration and international exchange opportunities.",
    "SRMIST also offers research-oriented programs such as M.Tech, M.Sc., and Ph.D. in various disciplines with state-of-the-art research facilities."
  ],
  "fee structure": [
    "Fee structure at SRMIST varies by program. Engineering programs typically range between ₹2-4 lakhs per year depending on the specialization and campus chosen.",
    "Medical and Dental programs at SRMIST have different fee structures, generally higher than engineering programs, ranging from ₹5-20 lakhs per year.",
    "Hostel and accommodation fees at SRMIST are separate and depend on the type of accommodation chosen, ranging from ₹75,000 to ₹1.5 lakhs per year.",
    "International students at SRMIST have a different fee structure, usually quoted in USD, with tuition ranging from $5,000-$10,000 per year depending on the program."
  ],
  "scholarship information": [
    "SRMIST offers merit-based scholarships up to 100% tuition fee waiver for students with outstanding academic performance or entrance exam scores.",
    "Sports scholarships are available at SRMIST for students with exceptional achievements in sports at national and international levels.",
    "SRMIST provides special scholarships for economically disadvantaged students through various government and institutional schemes.",
    "International students at SRMIST can apply for specific international student scholarships and country-specific aid programs."
  ],
  "campus facilities": [
    "SRMIST's main campus is in Kattankulathur, Chennai, with modern infrastructure spanning 250+ acres and state-of-the-art laboratories, research centers, and innovation hubs.",
    "The campus includes a central library with over 100,000 books, sports facilities including Olympic-sized swimming pool, medical center, and separate hostels for boys and girls.",
    "SRMIST has a fully Wi-Fi enabled campus with smart classrooms, research centers, incubation center, and modern teaching aids.",
    "Multiple campuses across India including Chennai (Kattankulathur, Ramapuram, Vadapalani) and NCR provide students with diverse learning environments and opportunities."
  ],
  "placement information": [
    "SRMIST has an impressive placement record with over 600+ companies visiting for campus recruitment annually, including major tech giants like Microsoft, Amazon, and Google.",
    "The average salary package for SRMIST graduates ranges from ₹4-6 lakhs per annum, with top packages going as high as ₹42 lakhs per annum for exceptional students.",
    "SRMIST's School of Engineering has particularly strong placement statistics with over 85% of eligible students getting placed in reputed companies.",
    "The Career Development Center at SRMIST provides comprehensive pre-placement training, including aptitude tests, group discussions, and mock interviews to prepare students for successful careers."
  ],
  "general inquiry": [
    "SRM Institute of Science and Technology (SRMIST) is a leading private university in India, established in 1985, with NAAC A++ accreditation and ranked among the top institutions by NIRF.",
    "SRMIST has strong international collaborations with over 150+ global universities and offers semester abroad programs, dual degree options, and international internships.",
    "The university has robust research facilities with over 30 specialized research centers working on cutting-edge technologies and sustainable development solutions.",
    "SRMIST hosts numerous technical, cultural, and sports events throughout the year, including 'Aaruush' - one of India's largest technical festivals, and 'Milan' - the cultural extravaganza."
  ]
};

export const generateResponse = async (message: string, intent: string): Promise<string> => {
  const lowerCaseMessage = message.toLowerCase();
  
  // More specific handling of user queries to provide targeted responses
  if (intent === "admission inquiries") {
    if (lowerCaseMessage.includes("deadline") || lowerCaseMessage.includes("when") || lowerCaseMessage.includes("date")) {
      return "The application process for SRMIST typically starts in November/December each year for the next academic year. The SRMJEEE exam is usually conducted in April, with results announced by May. Admission offers are made shortly after.";
    } else if (lowerCaseMessage.includes("requirement") || lowerCaseMessage.includes("need") || lowerCaseMessage.includes("document") || lowerCaseMessage.includes("eligibility")) {
      return "For SRMIST admissions, you need: 1) Completed application form, 2) 10th and 12th mark sheets (minimum 60% in PCM for engineering), 3) Valid ID proof, 4) Recent passport-sized photographs, and 5) Application fee payment receipt. International students need additional documents like passport copy, visa, and English proficiency test scores.";
    } else if (lowerCaseMessage.includes("process") || lowerCaseMessage.includes("how") || lowerCaseMessage.includes("apply") || lowerCaseMessage.includes("steps")) {
      return "The SRMIST admission process involves: 1) Register online at www.srmist.edu.in, 2) Fill the application form and pay the fee, 3) Take the SRMJEEE entrance exam or submit JEE/other accepted scores, 4) Await results and counseling call, 5) Attend counseling, select your program, and pay the initial fee to secure your seat.";
    } else if (lowerCaseMessage.includes("srmjeee") || lowerCaseMessage.includes("entrance") || lowerCaseMessage.includes("exam") || lowerCaseMessage.includes("test")) {
      return "SRMJEEE is the entrance exam for engineering programs at SRMIST. It tests Physics, Chemistry, and Mathematics (PCM). The computer-based test lasts 2.5 hours with 125 multiple-choice questions. Practice tests are available on the official website. SRMIST also accepts JEE Main scores for direct admission based on rank.";
    }
  } else if (intent === "course information") {
    if (lowerCaseMessage.includes("computer science") || lowerCaseMessage.includes("cs") || lowerCaseMessage.includes("programming") || lowerCaseMessage.includes("it")) {
      return "SRMIST offers B.Tech in Computer Science Engineering with various specializations including AI & Machine Learning, Data Science, Cybersecurity, IoT, and Cloud Computing. The 4-year program includes industry internships, capstone projects, and opportunities for research. The department has state-of-the-art labs and strong industry connections with companies like Microsoft, Google, and IBM.";
    } else if (lowerCaseMessage.includes("business") || lowerCaseMessage.includes("management") || lowerCaseMessage.includes("mba") || lowerCaseMessage.includes("bba")) {
      return "The SRM School of Management offers BBA and MBA programs with specializations in Marketing, Finance, HR, Operations, Business Analytics, and International Business. The program features case-based learning, industry mentorship, international exchange programs, and Bloomberg terminal access for real-world financial analysis training.";
    } else if (lowerCaseMessage.includes("engineering") || lowerCaseMessage.includes("b.tech") || lowerCaseMessage.includes("m.tech")) {
      return "SRMIST's Faculty of Engineering offers B.Tech and M.Tech programs across various disciplines including Mechanical, Civil, Electrical, Electronics, Aerospace, Automobile, Biomedical, Chemical, and more. All programs feature practical training, industry projects, and access to advanced research facilities. Several programs offer international university collaborations.";
    } else if (lowerCaseMessage.includes("medical") || lowerCaseMessage.includes("mbbs") || lowerCaseMessage.includes("health") || lowerCaseMessage.includes("doctor")) {
      return "SRM Medical College Hospital and Research Centre offers MBBS, MD/MS, BDS, Nursing, Allied Health Sciences, and Pharmacy programs. The medical campus features a 1500-bed teaching hospital, advanced diagnostic equipment, simulation labs, and specialized research centers. The programs are recognized by NMC (formerly MCI) and follow global medical education standards.";
    }
  } else if (intent === "fee structure") {
    if (lowerCaseMessage.includes("payment plan") || lowerCaseMessage.includes("installment") || lowerCaseMessage.includes("emi")) {
      return "SRMIST offers flexible payment plans allowing students to pay tuition in semester-wise installments. Some programs also offer EMI options through partner banks. There's an initial registration fee followed by semester payments. Special arrangements can be discussed with the Finance Office for students with financial constraints.";
    } else if (lowerCaseMessage.includes("international") || lowerCaseMessage.includes("foreign") || lowerCaseMessage.includes("nri")) {
      return "International student tuition at SRMIST ranges from $5,000-$10,000 per year depending on the program. NRI students have a separate fee structure. This includes tuition but excludes accommodation, meals, and insurance. International student services provide assistance with banking, accommodation, and visa extension.";
    } else if (lowerCaseMessage.includes("engineering") || lowerCaseMessage.includes("b.tech")) {
      return "For B.Tech programs at SRMIST, the annual tuition ranges from ₹2.25-3.75 lakhs depending on the branch and campus. Computer Science, AI specializations, and Data Science programs typically have higher fees. Additional costs include one-time admission fee (₹25,000), examination fee (₹20,000/year), and hostel charges if applicable.";
    } else if (lowerCaseMessage.includes("medical") || lowerCaseMessage.includes("mbbs")) {
      return "MBBS program at SRMIST costs approximately ₹15-20 lakhs per annum. Dental (BDS) program costs around ₹6-9 lakhs per annum. These programs have additional fees for lab usage, clinical training, and medical equipment. Scholarship opportunities are available for meritorious students.";
    }
  } else if (intent === "placement information") {
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
  
  // Get random response from the appropriate category if no specific match
  const availableResponses = responses[intent] || responses["general inquiry"];
  const randomIndex = Math.floor(Math.random() * availableResponses.length);
  return availableResponses[randomIndex];
};
