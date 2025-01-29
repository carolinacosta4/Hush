import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    cloudinaryId: { type: String },
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }]
  },
  {
    collection: "user",
    timestamps: false,
  }
);

const User = mongoose.model("User", schema);
export default User;
