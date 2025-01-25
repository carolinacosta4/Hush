import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./types.js";
import { resolvers } from "./resolvers.js";

const port = process.env.PORT || 4000;
const host = process.env.HOST || "localhost";
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port, host }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});