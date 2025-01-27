export const typeDefs = `
      type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
      }

      type SleepLog {
        id: ID!
        userId: ID!,
        date: String,
        bedtime: String,
        wakeTime: String,
        sleepQuality: String
      }
    
      input UserCreateInput{
        email: String!
        username: String!
        password: String!
      }
  
      input UserInput{
        email: String
        username: String
        password: String
      }

      input SleepLogsCreateInput{
        date: String!
        bedtime: String!
        wakeTime: String!
        sleepQuality: String!
      }

      input SleepLogsEditInput{
        date: String
        bedtime: String
        wakeTime: String
        sleepQuality: String
      }
  
      input UserLoginInput{
        username: String!
        password: String!
      }
  
      type Query {
        me: User
        listUsers: [User]
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
        listUserSleepLogs(id: ID!): [SleepLog]
        createSleepLogs(id: ID!, input: SleepLogsCreateInput): SleepLog
        updateSleepLogs(id: ID!, input: SleepLogsEditInput): SleepLog
        removeSleepLog(id: ID!): String
      }

      type Subscription {
        newSleepLogAdded: SleepLog
        sleepLogUpdated: SleepLog
        sleepLogDeleted: String
      }
`;
