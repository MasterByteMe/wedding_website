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

    // ✨ Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 🔍 Check for existing guest with the same normalized email
    const existingGuest = await Guest.findOne({ email: normalizedEmail });

    if (existingGuest) {
      return res.status(409).json({
        message: "This email has already been used to RSVP.",
      });
    }

    // 📝 Create new guest
    const guest = new Guest({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: normalizedEmail,
      mobile: mobile?.trim(),
      message: message?.trim(),
      rsvp_status,
    });

    await guest.save();

    return res.status(201).json({ message: "RSVP saved successfully!" });
  } catch (err) {
    // 🛑 Handle MongoDB duplicate error directly (fallback)
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(409).json({
        message: "This email has already been used to RSVP.",
      });
    }

    return res.status(500).json({
      message: "Failed to save RSVP",
      error: err.message,
    });
  }
};

// ✅ GET all guests (protected - admin dashboard)
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });
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
