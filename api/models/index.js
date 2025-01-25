import mongoose from "mongoose";
import dbConfig from "../config/db.config.js";
import User from "./users.model.js";
import SleepLog from "./sleeplogs.model.js";

const db = {};
db.mongoose = mongoose;
db.User = User;
db.SleepLog = SleepLog;

(async () => {
  try {
    console.log(dbConfig.URL);
    await db.mongoose.connect(dbConfig.URL);
    console.log("Connected to the database!");
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
})();

export default db;
