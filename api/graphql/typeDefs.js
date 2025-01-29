export const typeDefs = `
      type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        profilePicture: String!
        cloudinaryId: String!
        achievements: [Achievement!]
      }

      type Achievement {
        _id: ID!
        name: String!
        image: String!
      }

      type SleepLog {
        _id: ID!
        userId: ID!,
        date: String,
        bedTime: String,
        wakeTime: String,
        sleepQuality: Int
      }
    
      input UserCreateInput{
        email: String!
        username: String!
        password: String!
      }
  
      input UserInput{
        email: String
        username: String
        profilePicture: String
      }

      input SleepLogsCreateInput{
        date: String!
        bedTime: String!
        wakeTime: String!
        sleepQuality: Int!
      }

      input SleepLogsEditInput{
        date: String
        bedTime: String
        wakeTime: String
        sleepQuality: Int
      }
  
      input UserLoginInput{
        username: String!
        password: String!
      }
  
      type Tip {
        _id: ID!
        title: String!
        description: String!
        author: String!
        publishDate: String
      }
  
      input TipCreationInput{
        title: String!
        description: String!
        author: String!
        publishDate: String
      }

      input TipEditInput{
        title: String
        description: String
        author: String
      }

      enum Moods {
        Happy
        Sad
        Excited
        Tired
        Stressed
        Calm
        Motivated
        Relaxed
        Neutral
      }
      
      type MoodLog {
        _id: ID!
        userId: ID!
        date: String!
        mood: Moods!
        notes: String
      }

      input MoodLogInput {
        _id: ID
        userId: ID!
        mood: Moods!
        notes: String,
      }

      input MoodLogEditInput {
        date: String
        mood: Moods
        notes: String,
      }

      type Query {
        me: User
        listUsers: [User]
        listAllTips: [Tip]
        listUsersMoodLogs(idUser: String!): [MoodLog]
        findUserById(id: ID!): User
      }

      type LoginResponse {
        accessToken: String
        userID: ID
      }
    
      type Mutation {
        createUser(input: UserCreateInput!): User
        updateUser(id: ID!, input: UserInput!): User
        removeUser(id: ID!): String
        loginUser(input: UserLoginInput!): LoginResponse
        unlockAchievement(userId: ID!, achievementId: ID!): User
        listUserSleepLogs(id: ID!): [SleepLog]
        createSleepLogs(input: SleepLogsCreateInput): SleepLog
        updateSleepLogs(id: ID!, input: SleepLogsEditInput): SleepLog
        removeSleepLog(id: ID!): String
        createTip(input: TipCreationInput!): Tip
        removeTip(id: ID!): String
        updateTip(id: ID!, input: TipEditInput!): Tip
        createMoodLog(input: MoodLogInput!): MoodLog
        removeMoodLog(id: ID!): String
        updateMoodLog(id: ID!, input: MoodLogEditInput!): MoodLog
      }

      type Subscription {
        updatedUser: User
        newSleepLogAdded: SleepLog
        sleepLogUpdated: SleepLog
        sleepLogDeleted: String
        newTipAdded: Tip
        tipUpdated: Tip
        tipDeleted: String
        newModdLogAdded: MoodLog
        moodLogUpdated: MoodLog
        moodLogDeleted: String
      }
`;
