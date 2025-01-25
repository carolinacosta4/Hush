import db from "./models/index.js";
import mongoose from "mongoose";
const User = db.User;
const sleepLogs = db.SleepLog;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConfig from "./config/db.config.js";

export const resolvers = {
  Query: {
    listUsers: async () => await User.find(),
  },
  Mutation: {
    createUser: async (_, { input }) => {
      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (!input.username || !input.email || !input.password)
        throw new Error("Fields missing");

      const userFound = await User.findOne({ email: input.email });
      if (userFound) throw new Error("Email in use");

      const user = new User({
        username: input.username,
        email: input.email,
        password: bcrypt.hashSync(input.password, 10),
      });

      const newUser = await user.save();
      return newUser;
    },
    loginUser: async (_, { input }) => {
      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (!input.username || !input.password) throw new Error("Fields missing");

      const user = await User.findOne({ username: input.username });
      if (!user) throw new Error("User not found");

      const check = bcrypt.compareSync(input.password, user.password);
      if (!check) throw new Error("Wrong password");

      const token = jwt.sign({ id: user._id }, dbConfig.SECRET, {
        expiresIn: "48hr",
      });

      return {
        success: true,
        msg: "User logged in successfully.",
        accessToken: token,
        userID: user._id,
      };
    },
    updateUser: async (_, { id, input }, { loggedUserId }) => {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const user = await User.findById(id);
      if (!user) throw new Error("User not found.");

      // if (id != loggedUserId)
      //   throw new Error("You don't have permission to edit this user.");

      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (!input.username && !input.email && !input.password)
        throw new Error("Fields missing");

      if (input.password && input.oldPassword) {
        const isMatch = bcrypt.compareSync(input.oldPassword, user.password);
        if (!isMatch) throw new Error("Old password is incorrect.");
      }

      await User.findByIdAndUpdate(id, {
        username: input.username != null ? input.username : user.username,
        email: input.email != null ? input.email : user.email,
        password: input.password
          ? bcrypt.hashSync(input.password, 10)
          : user.password,
      });

      const updatedUser = await User.findById(id);
      console.log(updatedUser);

      return updatedUser;
    },
    removeUser: async (_, { id }) => {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const user = await User.findById(id);
      if (!user) throw new Error("User not found.");

      // if (id != req.loggedUserId)
      //   throw new Error("You don't have permission to delete this user.");

      await User.findByIdAndDelete(id);

      return "User deleted successfully.";
    },
    listUserSleepLogs: async (_, { id }) => {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const logs = await sleepLogs.find({ userId: id });
      if (!logs) throw new Error("Logs not found.");

      return logs;
    },
    createSleepLogs: async (_, { id, input }) => {
      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (
        !input.date ||
        !input.bedtime ||
        !input.wakeTime ||
        !input.sleepQuality
      )
        throw new Error("Fields missing");

      const newSleepLog = new sleepLogs({
        userId: id,
        date: input.date,
        bedtime: input.bedtime,
        wakeTime: input.wakeTime,
        sleepQuality: input.sleepQuality,
      });

      const savedSleepLog = await newSleepLog.save();
      return savedSleepLog;
    },
    updateSleepLogs: async (_, { id, input }) => {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const log = await sleepLogs.findById(id);
      if (!log) throw new Error("Log not found.");

      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (
        !input.date &&
        !input.bedtime &&
        !input.wakeTime &&
        !input.sleepQuality
      )
        throw new Error("Fields missing");

      await sleepLogs.findByIdAndUpdate(id, {
        date: input.date != null ? input.date : log.date,
        bedtime: input.bedtime != null ? input.bedtime : log.bedtime,
        wakeTime: input.wakeTime != null ? input.wakeTime : log.wakeTime,
        sleepQuality:
          input.sleepQuality != null ? input.sleepQuality : log.sleepQuality,
      });

      const updatedLog = await sleepLogs.findById(id);

      return updatedLog;
    },
    removeSleepLog: async (_, { id }) => {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const log = await sleepLogs.findById(id);
      if (!log) throw new Error("Log not found.");

      await sleepLogs.findByIdAndDelete(id);

      return "Log deleted successfully.";
    },
  },
};
