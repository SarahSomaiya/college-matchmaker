export interface College {
  id: string;
  name: string;
  location: string;
  streams: string[];
  fees: number;
  rating: number;
  image: string;
  acceptanceRate: number;
  examScoreRange: { min: number; max: number };
  featured?: boolean;
}

export const colleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, India",
    streams: ["Engineering", "Computer Science", "Data Science"],
    fees: 250000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60",
    acceptanceRate: 2,
    examScoreRange: { min: 280, max: 300 },
    featured: true,
  },
  {
    id: "2",
    name: "Indian Institute of Science",
    location: "Bangalore, India",
    streams: ["Science", "Research", "Engineering"],
    fees: 180000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
    acceptanceRate: 3,
    examScoreRange: { min: 270, max: 300 },
    featured: true,
  },
  {
    id: "3",
    name: "Delhi University",
    location: "New Delhi, India",
    streams: ["Arts", "Commerce", "Science"],
    fees: 45000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60",
    acceptanceRate: 15,
    examScoreRange: { min: 200, max: 280 },
    featured: true,
  },
  {
    id: "4",
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    streams: ["Engineering", "Pharmacy", "Science"],
    fees: 450000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=60",
    acceptanceRate: 5,
    examScoreRange: { min: 250, max: 300 },
  },
  {
    id: "5",
    name: "Jadavpur University",
    location: "Kolkata, India",
    streams: ["Engineering", "Arts", "Science"],
    fees: 35000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop&q=60",
    acceptanceRate: 12,
    examScoreRange: { min: 180, max: 260 },
  },
  {
    id: "6",
    name: "VIT Vellore",
    location: "Vellore, Tamil Nadu",
    streams: ["Engineering", "Management", "Science"],
    fees: 200000,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=60",
    acceptanceRate: 20,
    examScoreRange: { min: 150, max: 240 },
  },
  {
    id: "7",
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    streams: ["Engineering", "Architecture", "Management"],
    fees: 150000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60",
    acceptanceRate: 4,
    examScoreRange: { min: 240, max: 290 },
  },
  {
    id: "8",
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    streams: ["Engineering", "Medicine", "Management"],
    fees: 350000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&auto=format&fit=crop&q=60",
    acceptanceRate: 18,
    examScoreRange: { min: 160, max: 250 },
  },
];

export const streams = [
  "Engineering",
  "Computer Science",
  "Data Science",
  "Science",
  "Arts",
  "Commerce",
  "Medicine",
  "Management",
  "Architecture",
  "Pharmacy",
];

export const exams = [
  "JEE Main",
  "JEE Advanced",
  "BITSAT",
  "VITEEE",
  "COMEDK",
  "WBJEE",
  "KCET",
  "MHT CET",
];

export function calculateAdmissionChance(
  college: College,
  examScore: number,
  budget: number
): number {
  // Score factor (0-50 points)
  let scoreFactor = 0;
  const { min, max } = college.examScoreRange;
  if (examScore >= max) {
    scoreFactor = 50;
  } else if (examScore >= min) {
    scoreFactor = 25 + ((examScore - min) / (max - min)) * 25;
  } else if (examScore >= min - 50) {
    scoreFactor = ((examScore - (min - 50)) / 50) * 25;
  }

  // Budget factor (0-30 points)
  let budgetFactor = 0;
  if (budget >= college.fees) {
    budgetFactor = 30;
  } else if (budget >= college.fees * 0.7) {
    budgetFactor = 15 + ((budget - college.fees * 0.7) / (college.fees * 0.3)) * 15;
  }

  // Competition factor based on acceptance rate (0-20 points)
  const competitionFactor = Math.min(20, college.acceptanceRate);

  const totalChance = Math.min(95, Math.max(5, scoreFactor + budgetFactor + competitionFactor));
  return Math.round(totalChance);
}

export function getChanceLevel(chance: number): "high" | "medium" | "low" {
  if (chance >= 60) return "high";
  if (chance >= 35) return "medium";
  return "low";
}

export function formatFees(fees: number): string {
  if (fees >= 100000) {
    return `₹${(fees / 100000).toFixed(1)}L`;
  }
  return `₹${(fees / 1000).toFixed(0)}K`;
}