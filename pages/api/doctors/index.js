import dbConnect from "../../../lib/dbConnect";
import Doctor from "../../../models/Doctor";
import { validateDoctorData } from "../../utils/validation";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  try {
    switch (method) {
      case "GET":
        // Destructure with default values
        const {
          specialty = "General Physician & Internal Medicine",
          rating,
          experience,
          availability,
          gender,
          page = 1,
          limit = 10,
          sortBy = "rating",
          sortOrder = "desc",
        } = req.query;

        // Validate inputs
        if (isNaN(page) || isNaN(limit)) {
          return res.status(400).json({
            success: false,
            error: "Page and limit must be numbers",
          });
        }

        // Build query with required specialty
        const query = { specialty };

        // Add optional filters
        if (rating) query.rating = { $gte: Number(rating) };
        if (experience) query.experience = { $gte: Number(experience) };
        if (gender) query.gender = gender;
        
        // Availability filter
        if (["online", "clinic", "hospital"].includes(availability)) {
          query[`availability.${availability}`] = true;
        }

        // Execute query with pagination and sorting
        const [doctors, total] = await Promise.all([
          Doctor.find(query)
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit)),
          Doctor.countDocuments(query),
        ]);

        return res.status(200).json({
          success: true,
          data: doctors,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
          },
        });

      case "POST":
        // Validate request body
        const validationError = validateDoctorData(req.body);
        if (validationError) {
          return res.status(400).json({
            success: false,
            error: validationError,
          });
        }

        const doctor = await Doctor.create(req.body);
        return res.status(201).json({ 
          success: true, 
          data: doctor 
        });

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({
          success: false,
          error: `Method ${method} not allowed`,
        });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}