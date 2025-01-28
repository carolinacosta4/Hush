import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    mood: { type: String, required: true },
    notes: { type: String, required: false },
  },
  {
    collection: "moodlogs",
    timestamps: false,
  }
);

const MoodLog = mongoose.model("MoodLog", schema);
export default MoodLog;
