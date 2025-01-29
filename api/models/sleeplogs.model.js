import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    bedTime: { type: String, required: true },
    wakeTime: { type: String, required: true },
    sleepQuality: { type: String, required: true },
  },
  {
    collection: "sleeplogs",
    timestamps: false,
  }
);

const SleepLog = mongoose.model("SleepLog", schema);
export default SleepLog;
