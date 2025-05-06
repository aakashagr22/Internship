export function formatSpecialty(specialty) {
    return specialty
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }
  
  export function generateStructuredData(doctors, specialty, baseUrl) {
    return {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: `Apollo 247 - ${formatSpecialty(specialty)} Doctors`,
      url: `${baseUrl}/specialties/${specialty}`,
      medicalSpecialty: formatSpecialty(specialty),
      availableService: doctors.map((doctor) => ({
        "@type": "MedicalProcedure",
        name: "Medical Consultation",
        provider: {
          "@type": "Physician",
          name: doctor.name,
          medicalSpecialty: doctor.specialty
        }
      })),
    }
  }