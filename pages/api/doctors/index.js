import dbConnect from "../../../lib/dbConnect"
import Doctor from "../../../models/Doctor"

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "GET":
      try {
        // Extract query parameters
        const {
          specialty,
          rating,
          experience,
          availability,
          gender,
          page = 1,
          limit = 10,
          sortBy = "rating",
          sortOrder = "desc",
        } = req.query

        // Build query
        const query = {}

        // Required filter
        if (specialty) {
          query.specialty = specialty
        }

        // Optional filters
        if (rating) {
          query.rating = { $gte: Number.parseFloat(rating) }
        }

        if (experience) {
          query.experience = { $gte: Number.parseInt(experience) }
        }

        if (gender) {
          query.gender = gender
        }

        if (availability) {
          if (availability === "online") query["availability.online"] = true
          if (availability === "clinic") query["availability.clinic"] = true
          if (availability === "hospital") query["availability.hospital"] = true
        }

        // Pagination
        const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

        // Sorting
        const sort = {}
        sort[sortBy] = sortOrder === "asc" ? 1 : -1

        // Execute query
        const doctors = await Doctor.find(query).sort(sort).skip(skip).limit(Number.parseInt(limit))

        // Get total count for pagination
        const total = await Doctor.countDocuments(query)

        res.status(200).json({
          success: true,
          data: doctors,
          pagination: {
            total,
            page: Number.parseInt(page),
            limit: Number.parseInt(limit),
            pages: Math.ceil(total / Number.parseInt(limit)),
          },
        })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    case "POST":
      try {
        const doctor = await Doctor.create(req.body)
        res.status(201).json({ success: true, data: doctor })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
