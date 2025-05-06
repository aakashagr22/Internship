// import Head from "next/head"

// export default function SEO({ title, description, canonical, structuredData, specialty }) {
//   return (
//     <Head>
//       <title>{title}</title>
//       <meta name="description" content={description} />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />
//       <link rel="icon" href="/favicon.ico" />
//       {canonical && <link rel="canonical" href={canonical} />}
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:type" content="website" />
//       {canonical && <meta property="og:url" content={canonical} />}
//       <meta property="og:site_name" content="Apollo 247 Clone" />
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta
//         name="keywords"
//         content={`${specialty}, doctors, healthcare, medical consultation, online doctor, apollo 247`}
//       />
//       {structuredData && (
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
//       )}
//     </Head>
//   )
// }
import Head from "next/head";

export default function SEO({
  title,
  description,
  canonical,
  structuredData,
  specialty,
  image = "/default-doctor-preview.jpg" // fallback preview image
}) {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Apollo 247 Clone",
    "url": canonical || "https://yoursite.com",
    "department": {
      "@type": "MedicalSpecialty",
      "name": specialty || "General Physician"
    }
  };

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content="Apollo 247 Clone" />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Keywords for SEO */}
      <meta
        name="keywords"
        content={`${specialty}, doctors, healthcare, medical consultation, online doctor, apollo 247`}
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData || defaultStructuredData),
        }}
      />
    </Head>
  );
}
