export default function sitemap() {
  const baseUrl = "https://localhost:3000";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/specialties/general-physician-internal-medicine`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]
}
