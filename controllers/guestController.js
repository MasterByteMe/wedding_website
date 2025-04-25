// guestController.js
import Guest from "../models/Guest.js";

// ✅ CREATE a new guest (public - RSVP form)
export const createGuest = async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, message, rsvp_status } =
      req.body;

    if (!firstname || !lastname || !email || !rsvp_status) {
      return res.status(400).json({
        message: "First name, last name, email, and RSVP status are required.",
      });
    }

    // 🔍 Check for existing guest with the same email
    const existingGuest = await Guest.findOne({ email });

    if (existingGuest) {
      return res.status(409).json({
        message: "This email has already been used to RSVP.",
      });
    }

    const guest = new Guest({
      firstname,
      lastname,
      email,
      mobile,
      message,
      rsvp_status,
    });

    await guest.save();
    res.status(201).json({ message: "RSVP saved successfully!" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to save RSVP",
      error: err.message,
    });
  }
};

// ✅ GET all guests (protected - admin dashboard)
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });

    // Optional: limit fields returned to frontend
    // const guests = await Guest.find({}, "name email rsvp_status createdAt");

    res.status(200).json(guests);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch guests",
      error: err.message,
    });
  }
};

// ✅ GET single guest by ID
export const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);

    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.status(200).json(guest);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch guest",
      error: err.message,
    });
  }
};
