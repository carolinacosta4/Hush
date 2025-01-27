import "dotenv/config";
import { connectDB } from "./models/index.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import jwt from "jsonwebtoken";
import cors from "cors";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
const host = process.env.HOST || "localhost";
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

connectDB();

const startServer = async () => {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        let payload = null;
        try {
          payload = jwt.verify(token, process.env.SECRET);
          return { loggedIn: true, user: payload };
        } catch (error) {
          return { loggedIn: false, user: null };
        }
      },
    })
  );
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  useServer({ schema }, wsServer);
  httpServer.listen(port, () => {
    console.log(`Servidor pronto em http://${host}:${port}/graphql`);
  });
};

startServer();
