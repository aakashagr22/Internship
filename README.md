# Apollo247 Doctor Listing Clone

A Next.js clone of Apollo247's doctor listing page with MongoDB integration and REST APIs.

## Features

- Doctor listing page with filters
- MongoDB database integration
- REST APIs for adding and listing doctors
- SEO optimization with structured data

## Prerequisites

- Node.js 14+ and npm
- MongoDB database (local or Atlas)

## Getting Started

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/yourusername/apollo247-clone.git
cd apollo247-clone
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

4. **Seed the database**

\`\`\`bash
npm run seed
\`\`\`

5. **Run the development server**

\`\`\`bash
npm run dev
\`\`\`

6. **Open the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### GET /api/doctors

List doctors with optional filters:

- `specialty`: Filter by specialty (required)
- `gender`: Filter by gender
- `experience`: Filter by minimum years of experience
- `availability`: Filter by availability type (online, clinic, hospital)
- `page`: Page number for pagination
- `limit`: Number of items per page
- `sortBy`: Field to sort by (rating, experience, consultationFee)
- `sortOrder`: Sort order (asc, desc)

Example:
\`\`\`
GET /api/doctors?specialty=General%20Physician%20%26%20Internal%20Medicine&experience=10&page=1&limit=10
\`\`\`

### POST /api/doctors

Add a new doctor:

\`\`\`json
{
  "name": "Dr. John Doe",
  "specialty": "General Physician & Internal Medicine",
  "qualification": "MBBS, MD",
  "experience": 10,
  "gender": "Male",
  "consultationFee": 800,
  "languages": ["English", "Hindi"],
  "availability": {
    "online": true,
    "clinic": true,
    "hospital": false
  },
  "imageUrl": "/images/doctors/doctor-1.png",
  "location": "Mumbai",
  "hospital": "Apollo Hospitals"
}
\`\`\`

## Project Structure

- `/components`: React components
- `/models`: MongoDB schemas
- `/pages`: Next.js pages and API routes
- `/lib`: Utility functions
- `/public`: Static assets
- `/scripts`: Database seeding scripts

## Technologies Used

- Next.js
- MongoDB with Mongoose
- Tailwind CSS
- Lucide React (for icons)

## License

MIT
