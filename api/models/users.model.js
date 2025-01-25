import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // profilePicture: { type: String },
    // cloudinary_id: { type: String },
  },
  {
    collection: "user",
    timestamps: false,
  }
);

const User = mongoose.model("User", schema);
export default User;
