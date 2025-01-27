import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    publishDate: { type: Date, required: false },
  },
  {
    collection: "tip",
    timestamps: false,
  }
);

const Tip = mongoose.model("Tip", schema);
export default Tip;
