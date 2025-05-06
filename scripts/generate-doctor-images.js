const fs = require("fs")
const path = require("path")

// Create the directory if it doesn't exist
const imagesDir = path.join(__dirname, "../public/images/doctors")
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// Generate placeholder SVG content for each doctor
const doctors = [
  { id: 1, name: "Dr. Rajesh Kumar", gender: "Male" },
  { id: 2, name: "Dr. Priya Sharma", gender: "Female" },
  { id: 3, name: "Dr. Suresh Patel", gender: "Male" },
  { id: 4, name: "Dr. Ananya Reddy", gender: "Female" },
  { id: 5, name: "Dr. Vikram Singh", gender: "Male" },
]

doctors.forEach((doctor) => {
  const bgColor = doctor.gender === "Male" ? "#E6F7FF" : "#FFF0F6"
  const textColor = doctor.gender === "Male" ? "#0070F3" : "#EB2F96"

  const svgContent = `
<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="300" fill="${bgColor}" />
  <circle cx="150" cy="120" r="70" fill="#FFFFFF" />
  <circle cx="150" cy="100" r="40" fill="#CCCCCC" />
  <rect x="110" y="140" width="80" height="80" rx="40" fill="#CCCCCC" />
  <text x="150" y="240" font-family="Arial" font-size="20" fill="${textColor}" text-anchor="middle">${doctor.name}</text>
</svg>
  `

  fs.writeFileSync(path.join(imagesDir, `doctor-${doctor.id}.svg`), svgContent)
  console.log(`Generated image for ${doctor.name}`)
})

console.log("All doctor images generated successfully!")
