import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    rsvp_status: {
      type: String,
      enum: ["Accept With Pleasure!", "Decline With Regret"],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

export default mongoose.model("Guest", guestSchema);
