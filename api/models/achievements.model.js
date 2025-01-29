import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    cloudinary_id_image: { type: String, required: false },
  },
  {
    collection: "achievements",
    timestamps: false,
  }
);

const Achievement = mongoose.model("Achievement", schema);
export default Achievement;
