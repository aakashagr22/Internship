import React from "react";
import generateStructuredData from "./structured-data";
import { connectToDatabase, Doctor } from "@/lib/db";

export const metadata = {
  title: "General Physician & Internal Medicine Doctors | Apollo 247 Clone",
  description:
    "Find the best General Physicians and Internal Medicine specialists. Book appointments online for consultations with experienced doctors.",
};

async function getTopDoctors() {
  try {
    await connectToDatabase();
    const doctors = await Doctor.find({ specialty: "General Physician & Internal Medicine" })
      .sort({ rating: -1 })
      .limit(10);

    return JSON.parse(JSON.stringify(doctors));
  } catch (error) {
    console.error("Error fetching top doctors for structured data:", error);
    return [];
  }
}

export default async function DoctorsLayout({ children }) {
  const topDoctors = await getTopDoctors();

  return (
    <>
      {generateStructuredData(topDoctors)}
      {children}
    </>
  );
}