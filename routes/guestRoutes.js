// guestRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getGuests,
  getGuestById,
  createGuest,
} from "../controllers/guestController.js";

const router = express.Router();

router.get("/", protect, getGuests); // All guests (dashboard)
router.get("/:id", protect, getGuestById); // ✅ Single guest view
router.post("/", createGuest); // Public RSVP

export default router;
