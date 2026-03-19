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

import { loadDataset } from "./loadDataset";

export async function getColleges(): Promise<College[]> {
  console.log("Getting colleges...");
  // `loadDataset` already reads the Excel file and normalises the two
  // tricky columns (streams and examScoreRange).  We simply map the
  // generic rows back to our `College` interface here and coerce the
  // remaining fields.
  const rows = await loadDataset();
  console.log("Raw rows from dataset:", rows);

  const colleges: College[] = rows.map((row) => ({
    id: String(row.id || "").trim(),
    name: String(row.name || "").trim(),
    location: String(row.location || "").trim(),
    streams: Array.isArray(row.streams) ? row.streams : [],
    fees: Number(row.fees) || 0,
    rating: Number(row.rating) || 0,
    image: String(row.image || "").trim(),
    acceptanceRate: Number(row.acceptanceRate) || 0,
    examScoreRange: {
      min: Number(row.examScoreRange?.min) || 0,
      max: Number(row.examScoreRange?.max) || 0,
    },
    featured: row.featured === true || String(row.featured).toLowerCase() === "true",
  }));

  console.log("Processed colleges:", colleges);

  // sanity check during development: log the number of colleges loaded
  if (process.env.NODE_ENV !== "production") {
    console.info(`[collegeData] loaded ${colleges.length} colleges`);
    if (colleges.length < 50) {
      // if the file shrinks unexpectedly we want to catch it early
      console.warn("[collegeData] fewer colleges than expected – check dataset", colleges.length);
    }
  }

  return colleges;
}

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
  "Law",
  "Design",
];

export interface ExamDetails {
  name: string;
  maxScore: number;
  streams: string[];
}

export const examScores: ExamDetails[] = [
  { name: "JEE Main", maxScore: 300, streams: ["Engineering", "Computer Science", "Data Science"] },
  { name: "JEE Advanced", maxScore: 360, streams: ["Engineering", "Computer Science", "Data Science"] },
  { name: "BITSAT", maxScore: 300, streams: ["Engineering", "Computer Science", "Data Science"] },
  { name: "VITEEE", maxScore: 150, streams: ["Engineering", "Computer Science"] },
  { name: "COMEDK", maxScore: 200, streams: ["Engineering", "Computer Science"] },
  { name: "WBJEE", maxScore: 200, streams: ["Engineering"] },
  { name: "KCET", maxScore: 180, streams: ["Engineering"] },
  { name: "MHT CET", maxScore: 200, streams: ["Engineering"] },
  { name: "CUET", maxScore: 720, streams: ["Arts", "Commerce", "Science"] },
  { name: "NEET", maxScore: 720, streams: ["Medicine", "Science"] },
  { name: "CAT", maxScore: 100, streams: ["Management"] },
  { name: "CLAT", maxScore: 150, streams: ["Law"] },
  { name: "NID DAT", maxScore: 100, streams: ["Design"] },
  { name: "SNAP", maxScore: 60, streams: ["Management"] },
  { name: "SRMJEEE", maxScore: 315, streams: ["Engineering"] },
];

export const exams = examScores.map((exam) => exam.name);

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

export function getExamMaxScore(examName: string): number {
  const exam = examScores.find((e) => e.name === examName);
  return exam?.maxScore || 300;
}