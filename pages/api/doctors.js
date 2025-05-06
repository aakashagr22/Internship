import dbConnect from "../../../lib/dbConnect";
import Doctor from "../../../models/Doctor";
import { validateDoctorData, validateFilters } from "../../../utils/validation";

// Constants for default values
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const DEFAULT_SORT = "rating";
const DEFAULT_ORDER = "desc";
const DEFAULT_SPECIALTY = "General Physician & Internal Medicine";

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  try {
    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({
      success: false,
      error: "Database connection failed",
    });
  }

  try {
    switch (method) {
      case "GET":
        // Destructure query parameters
        const {
          specialty = DEFAULT_SPECIALTY,
          rating,
          experience,
          availability,
          gender,
          page = DEFAULT_PAGE,
          limit = DEFAULT_LIMIT,
          sortBy = DEFAULT_SORT,
          sortOrder = DEFAULT_ORDER,
        } = req.query;

        // Validate filters
        const filterError = validateFilters({
          rating,
          experience,
          availability,
          gender,
          page,
          limit,
        });
        if (filterError) {
          return res.status(400).json({
            success: false,
            error: filterError,
          });
        }

        // Build query
        const query = { specialty };
        
        // Apply filters
        if (rating) query.rating = { $gte: Number(rating) };
        if (experience) query.experience = { $gte: Number(experience) };
        if (gender) query.gender = gender;
        if (availability) query[`availability.${availability}`] = true;

        // Execute query with pagination
        const [doctors, total] = await Promise.all([
          Doctor.find(query)
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .lean(), // Use lean() for better performance
          Doctor.countDocuments(query),
        ]);

        return res.status(200).json({
          success: true,
          data: doctors,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
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

        // Create new doctor
        const doctor = await Doctor.create(req.body);
        
        // Return 201 Created status
        return res.status(201).json({
          success: true,
          data: doctor.toObject(), // Convert to plain JavaScript object
        });

      default:
        // Handle unsupported methods
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({
          success: false,
          error: `Method ${method} not allowed`,
        });
    }
  } catch (error) {
    console.error("API Error:", error);
    
    // Handle duplicate key errors (e.g., unique fields)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate field value entered",
        details: error.keyValue,
      });
    }
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: messages,
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}