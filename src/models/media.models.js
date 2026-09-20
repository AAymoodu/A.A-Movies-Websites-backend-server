import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    poster: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["Movie", "Series"],
      default: "Movie",
      required: true,
    },
    episodes: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Media", mediaSchema);
