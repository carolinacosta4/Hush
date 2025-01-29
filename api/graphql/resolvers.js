import { PubSub } from "graphql-subscriptions";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import User from "../models/users.model.js";
import Tip from "../models/tips.model.js";
import sleepLogs from "../models/sleeplogs.model.js";
import MoodLog from "../models/moodlogs.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConfig from "../config/db.config.js";

const pubsub = new PubSub();

const userResolver = {
  Query: {
    me: async (_, {}, contextValue) => {
      if (contextValue.loggedIn) {
        let user = await User.findById(contextValue.user.id);
        return user;
      } else {
        throw new GraphQLError("Please login again", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }
    },
    listUsers: async () => await User.find(),
    findUserById: async (_, { id }) => {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const user = await User.findById(id).exec();
      if (!user) throw new Error("User not found.");

      return user;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (!input.username || !input.email || !input.password)
        throw new Error("Fields missing");

      const userFound = await User.findOne({ email: input.email });
      if (userFound) throw new Error("Email in use");

      const usernameFound = await User.findOne({ username: input.username });
      if (usernameFound) throw new Error("Username in use");

      const user = new User({
        username: input.username,
        email: input.email,
        password: bcrypt.hashSync(input.password, 10),
        profilePicture:
          "https://res.cloudinary.com/ditdnslga/image/upload/v1735949597/ipmihkt7ebpogdtnlw4b.png",
        cloudinaryId: 0,
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
    updateUser: async (_, { id, input }, contextValue) => {
      if (!contextValue.user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }

      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const user = await User.findById(id);
      if (!user) throw new Error("User not found.");

      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (!input.username && !input.email && !input.password)
        throw new Error("Fields missing");

      if (contextValue.user.id != id)
        throw new Error("You can only update your own account.");

      if (input.password && input.oldPassword) {
        const isMatch = bcrypt.compareSync(input.oldPassword, user.password);
        if (!isMatch) throw new Error("Old password is incorrect.");
      }

      const userEmail = await User.findOne({ email: input.email });
      if (userEmail && userEmail.id != id)
        throw new Error("Email already in use.");

      const userUsername = await User.findOne({ username: input.username });
      if (userUsername && userUsername.id != id)
        throw new Error("Username already in use.");

      await User.findByIdAndUpdate(id, {
        username: input.username != null ? input.username : user.username,
        email: input.email != null ? input.email : user.email,
        profilePicture:
          input.profilePicture != null
            ? input.profilePicture
            : user.profilePicture,
      });

      const updatedUser = await User.findById(id);

      pubsub.publish("USER_UPDATED", {
        updatedUser: updatedUser,
      });

      return updatedUser;
    },
    removeUser: async (_, { id }, contextValue) => {
      if (!contextValue.user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }

      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const user = await User.findById(id);
      if (!user) throw new Error("User not found.");

      if (contextValue.user.id != id)
        throw new Error("You can only update your own account.");

      await User.findByIdAndDelete(id);

      return "User deleted successfully.";
    },
  },
  Subscription: {
    updatedUser: {
      subscribe: () => pubsub.asyncIterableIterator("USER_UPDATED"),
    },
  },
};

const sleepLogsResolver = {
  Mutation: {
    listUserSleepLogs: async (_, { id }) => {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const logs = await sleepLogs.find({ userId: id });
      if (!logs) throw new Error("Logs not found.");

      const logsWithFormattedDates = logs.map((log) => ({
        ...log.toObject(),
        date: new Date(log.date).toISOString(),
      }));

      return logsWithFormattedDates;
    },
    createSleepLogs: async (_, { input }, contextValue) => {
      if (!contextValue.user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }

      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (
        !input.date ||
        !input.bedTime ||
        !input.wakeTime ||
        !input.sleepQuality
      )
        throw new Error("Fields missing");

      const existingLog = await sleepLogs.findOne({
        userId: contextValue.user.id,
        date: {
          $gte: new Date(new Date(input.date).setHours(0, 0, 0, 0)),
          $lt: new Date(new Date(input.date).setHours(24, 0, 0, 0)),
        },
      });      

      if (existingLog) throw new Error("A log with this date already exists.");

      const newSleepLog = new sleepLogs({
        userId: contextValue.user.id,
        date: input.date,
        bedTime: input.bedTime,
        wakeTime: input.wakeTime,
        sleepQuality: input.sleepQuality,
      });

      const savedSleepLog = await newSleepLog.save();

      pubsub.publish("NEW_SLEEP_LOG_ADDED", {
        newSleepLogAdded: savedSleepLog,
      });
      return savedSleepLog;
    },
    updateSleepLogs: async (_, { id, input }, contextValue) => {
      if (!contextValue.user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }

      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const log = await sleepLogs.findById(id);
      if (!log) throw new Error("Log not found.");

      if (log.userId != contextValue.user.id)
        throw new Error("You can only update your own logs.");

      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (
        !input.date &&
        !input.bedTime &&
        !input.wakeTime &&
        !input.sleepQuality
      )
        throw new Error("Fields missing");

      await sleepLogs.findByIdAndUpdate(id, {
        date: input.date != null ? input.date : log.date,
        bedTime: input.bedTime != null ? input.bedTime : log.bedTime,
        wakeTime: input.wakeTime != null ? input.wakeTime : log.wakeTime,
        sleepQuality:
          input.sleepQuality != null ? input.sleepQuality : log.sleepQuality,
      });

      const updatedLog = await sleepLogs.findById(id);

      pubsub.publish("SLEEP_LOG_UPDATED", { sleepLogUpdated: updatedLog });
      return updatedLog;
    },
    removeSleepLog: async (_, { id }, contextValue) => {
      if (!contextValue.user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }

      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const log = await sleepLogs.findById(id);
      if (!log) throw new Error("Log not found.");

      if (log.userId != contextValue.user.id)
        throw new Error("You can only delete your own logs.");

      await sleepLogs.findByIdAndDelete(id);
      pubsub.publish("SLEEP_LOG_DELETED", { sleepLogDeleted: id });

      return "Log deleted successfully.";
    },
  },
  Subscription: {
    newSleepLogAdded: {
      subscribe: () => pubsub.asyncIterableIterator(["NEW_SLEEP_LOG_ADDED"]),
    },
    sleepLogUpdated: {
      subscribe: () => pubsub.asyncIterableIterator(["SLEEP_LOG_UPDATED"]),
    },
    sleepLogDeleted: {
      subscribe: () => pubsub.asyncIterableIterator(["SLEEP_LOG_DELETED"]),
    },
  },
};

const tipsResolver = {
  Query: {
    listAllTips: async () => {
      return await Tip.find();
    },
  },
  Mutation: {
    createTip: async (_, { input }) => {
      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (!input.title || !input.description || !input.author)
        throw new Error("Fields missing");

      let today = new Date();

      const newTip = new Tip({
        title: input.title,
        description: input.description,
        author: input.author,
        publishDate: today.toISOString(),
      });

      const tip = await newTip.save();

      pubsub.publish("NEW_TIP_ADDED", {
        newTipAdded: tip,
      });

      return tip;
    },
    removeTip: async (_, { id }) => {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const tip = await Tip.findById(id);
      if (!tip) throw new Error("Tip not found.");

      await Tip.findByIdAndDelete(id);
      pubsub.publish("TIP_DELETED", { tipDeleted: id });

      return "Tip deleted successfully.";
    },
    updateTip: async (_, { id, input }) => {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const tip = await Tip.findById(id);
      if (!tip) throw new Error("Tip not found.");

      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (!input.title && !input.description && !input.author)
        throw new Error("Fields missing");

      let t = new Date();
      let today = t.toISOString();

      await Tip.findByIdAndUpdate(id, {
        title: input.title != null ? input.title : tip.title,
        description:
          input.description != null ? input.description : tip.description,
        author: input.author != null ? input.author : tip.author,
        publishDate: today,
      });

      const updatedTip = await Tip.findById(id);

      pubsub.publish("TIP_UPDATED", { tipUpdated: updatedTip });

      return updatedTip;
    },
  },
  Subscription: {
    newTipAdded: {
      subscribe: () => pubsub.asyncIterableIterator(["NEW_TIP_ADDED"]),
    },
    tipUpdated: {
      subscribe: () => pubsub.asyncIterableIterator(["TIP_UPDATED"]),
    },
    tipDeleted: {
      subscribe: () => pubsub.asyncIterableIterator(["TIP_DELETED"]),
    },
  },
};

const moodLogsResolver = {
  Query: {
    listUsersMoodLogs: async (_, { idUser }) => {
      if (!mongoose.isValidObjectId(idUser)) {
        throw new Error("Invalid ID.");
      }

      const logs = await MoodLog.find({ userId: idUser });

      const logsWithFormattedDates = logs.map((log) => ({
        ...log.toObject(),
        date: new Date(log.date).toISOString(),
      }));

      return logsWithFormattedDates;
    },
  },
  Mutation: {
    createMoodLog: async (_, { id, input }, contextValue) => {
      if (!contextValue.user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }

      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      let t = new Date();
      let today = t.toISOString();

      const newLog = new MoodLog({
        userId: input.userId,
        date: today,
        mood: input.mood,
        notes: input.notes,
      });

      const log = await newLog.save();

      pubsub.publish("NEW_MOOD_LOG_ADDED", {
        newMoodLogAdded: log,
      });
      return log;
    },
    updateMoodLog: async (_, { id, input }, contextValue) => {
      if (!contextValue.user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }

      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const log = await MoodLog.findById(id);
      if (!log) throw new Error("MoodLog not found.");

      if (Object.values(input).length == 0)
        throw new Error("You need to provide the body with the request.");

      if (!input.mood && !input.date && !input.notes)
        throw new Error("Fields missing");

      await MoodLog.findByIdAndUpdate(id, {
        date: input.date != null ? input.date : log.date,
        mood: input.mood != null ? input.mood : log.mood,
        notes: input.notes != null ? input.notes : log.notes,
      });

      const updatedLog = await MoodLog.findById(id);
      pubsub.publish("MOOD_LOG_UPDATED", { sleepLogUpdated: updatedLog });

      return updatedLog;
    },
    removeMoodLog: async (_, { id }, contextValue) => {
      if (!contextValue.user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }

      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID.");

      const log = await MoodLog.findById(id);
      if (!log) throw new Error("MoodLog not found.");

      await MoodLog.findByIdAndDelete(id);
      pubsub.publish("MOOD_LOG_DELETED", { moodLogDeleted: id });

      return "MoodLog deleted successfully.";
    },
  },
  Subscription: {
    newSleepLogAdded: {
      subscribe: () => pubsub.asyncIterableIterator(["NEW_MOOD_LOG_ADDED"]),
    },
    sleepLogUpdated: {
      subscribe: () => pubsub.asyncIterableIterator(["MOOD_LOG_UPDATED"]),
    },
    sleepLogDeleted: {
      subscribe: () => pubsub.asyncIterableIterator(["MOOD_LOG_DELETED"]),
    },
  },
};

import { mergeResolvers } from "@graphql-tools/merge";
export const resolvers = mergeResolvers([
  userResolver,
  sleepLogsResolver,
  tipsResolver,
  moodLogsResolver,
]);
