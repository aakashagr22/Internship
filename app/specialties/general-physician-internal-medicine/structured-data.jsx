export default function generateStructuredData(doctors) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    name: "General Physician & Internal Medicine",
    description: "Find and book appointments with General Physicians and Internal Medicine specialists.",
    relevantSpecialty: {
      "@type": "MedicalSpecialty",
      name: "General Physician & Internal Medicine",
    },
    physician: doctors.map((doctor) => ({
      "@type": "Physician",
      name: doctor.name,
      medicalSpecialty: {
        "@type": "MedicalSpecialty",
        name: doctor.specialty,
      },
      gender: doctor.gender,
      knowsLanguage: doctor.languages,
      memberOf: doctor.hospital
        ? {
            "@type": "Hospital",
            name: doctor.hospital,
          }
        : undefined,
      address: doctor.location
        ? {
            "@type": "PostalAddress",
            addressLocality: doctor.location,
          }
        : undefined,
      review:
        doctor.reviewCount > 0
          ? {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: doctor.rating,
                bestRating: "5",
              },
              reviewCount: doctor.reviewCount,
            }
          : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}