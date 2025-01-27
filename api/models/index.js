import mongoose from "mongoose";
import dbConfig from "../config/db.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.URL);
    console.log("Connected to the database!");
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit(1);
  }
};
