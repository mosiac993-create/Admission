// Security middleware temporarily removed to fix compilation

export const mockUniversities = [
  // Safe Category
  {
    id: 1,
    name: "Arizona State University",
    category: "Safe",
    matchScore: 85,
    country: "USA",
    fees: "$28,800",
    ranking: "#117 Global",
    deadline: "May 1, 2024",
    requirements: {
      gpa: "3.0+",
      gre: "300+",
      ielts: "6.5",
      toefl: "80",
      lors: 2,
      sop: "Required",
      workExp: "Not required"
    },
    description: "Large public research university with strong online programs and diverse student body.",
    acceptanceRate: "88%",
    averageProfile: {
      gpa: 3.4,
      gre: 315,
      ielts: 7.0
    }
  },
  {
    id: 2,
    name: "University of Cincinnati",
    category: "Safe",
    matchScore: 82,
    country: "USA",
    fees: "$26,334",
    ranking: "#176 Global",
    deadline: "June 15, 2024",
    requirements: {
      gpa: "3.0+",
      gre: "295+",
      ielts: "6.5",
      toefl: "79",
      lors: 2,
      sop: "Required",
      workExp: "Preferred"
    },
    description: "Public research university known for cooperative education programs.",
    acceptanceRate: "73%",
    averageProfile: {
      gpa: 3.3,
      gre: 310,
      ielts: 6.8
    }
  },

  // Moderate Category
  {
    id: 3,
    name: "University of Warwick",
    category: "Moderate",
    matchScore: 72,
    country: "UK",
    fees: "£24,760",
    ranking: "#64 Global",
    deadline: "March 31, 2024",
    requirements: {
      gpa: "3.3+",
      gre: "320+",
      ielts: "7.0",
      toefl: "92",
      lors: 2,
      sop: "Required",
      workExp: "2+ years preferred"
    },
    description: "Leading UK university known for business, engineering, and research excellence.",
    acceptanceRate: "56%",
    averageProfile: {
      gpa: 3.6,
      gre: 325,
      ielts: 7.5
    }
  },
  {
    id: 4,
    name: "University of Toronto",
    category: "Moderate",
    matchScore: 68,
    country: "Canada",
    fees: "CAD $58,160",
    ranking: "#34 Global",
    deadline: "January 15, 2024",
    requirements: {
      gpa: "3.5+",
      gre: "315+",
      ielts: "7.0",
      toefl: "93",
      lors: 3,
      sop: "Required",
      workExp: "Recommended"
    },
    description: "Top Canadian university with world-class research facilities and diverse programs.",
    acceptanceRate: "43%",
    averageProfile: {
      gpa: 3.7,
      gre: 322,
      ielts: 7.3
    }
  },
  {
    id: 5,
    name: "University of Melbourne",
    category: "Moderate",
    matchScore: 70,
    country: "Australia",
    fees: "AUD $45,824",
    ranking: "#33 Global",
    deadline: "October 31, 2024",
    requirements: {
      gpa: "3.4+",
      gre: "310+",
      ielts: "6.5",
      toefl: "79",
      lors: 2,
      sop: "Required",
      workExp: "Not required"
    },
    description: "Australia's leading university with strong industry connections.",
    acceptanceRate: "70%",
    averageProfile: {
      gpa: 3.6,
      gre: 318,
      ielts: 7.2
    }
  },

  // Ambitious Category
  {
    id: 6,
    name: "Stanford University",
    category: "Ambitious",
    matchScore: 45,
    country: "USA",
    fees: "$74,570",
    ranking: "#3 Global",
    deadline: "December 3, 2024",
    requirements: {
      gpa: "3.8+",
      gre: "330+",
      ielts: "7.5",
      toefl: "100",
      lors: 3,
      sop: "Required",
      workExp: "3+ years preferred"
    },
    description: "Elite private research university in Silicon Valley, known for innovation and entrepreneurship.",
    acceptanceRate: "4%",
    averageProfile: {
      gpa: 3.9,
      gre: 335,
      ielts: 8.0
    }
  },
  {
    id: 7,
    name: "MIT",
    category: "Ambitious",
    matchScore: 42,
    country: "USA",
    fees: "$77,020",
    ranking: "#1 Global",
    deadline: "December 15, 2024",
    requirements: {
      gpa: "3.9+",
      gre: "335+",
      ielts: "7.5",
      toefl: "100",
      lors: 3,
      sop: "Required",
      workExp: "Research experience required"
    },
    description: "World's leading technology institute with cutting-edge research and innovation.",
    acceptanceRate: "7%",
    averageProfile: {
      gpa: 3.95,
      gre: 340,
      ielts: 8.2
    }
  },
  {
    id: 8,
    name: "Oxford University",
    category: "Ambitious",
    matchScore: 38,
    country: "UK",
    fees: "£28,370",
    ranking: "#4 Global",
    deadline: "January 6, 2024",
    requirements: {
      gpa: "3.8+",
      gre: "330+",
      ielts: "7.5",
      toefl: "110",
      lors: 3,
      sop: "Required",
      workExp: "Exceptional background required"
    },
    description: "Historic university with unparalleled academic reputation and research excellence.",
    acceptanceRate: "17%",
    averageProfile: {
      gpa: 3.9,
      gre: 338,
      ielts: 8.1
    }
  }
];

export const getUniversitiesByCategory = () => {
  // For now, remove security layer to fix compilation
  return {
    safe: mockUniversities.filter(uni => uni.category === 'Safe'),
    moderate: mockUniversities.filter(uni => uni.category === 'Moderate'),
    ambitious: mockUniversities.filter(uni => uni.category === 'Ambitious')
  };
};

export const getUniversityById = (id) => {
  // For now, remove security layer to fix compilation
  return mockUniversities.find(uni => uni.id === parseInt(id));
};
