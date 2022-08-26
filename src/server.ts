import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from 'schema';
import resolvers from 'resolvers';
import models from 'models';
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 8801;
const mongoUri: string | undefined = process.env.MONGO_DB_URI;
mongoose.connect(`${mongoUri}`, { dbName: 'invoiceDB' });
// Graphql Server
let server = null;
const startServer = async () => {
  server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: { models },
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
};
startServer();
// Middleware
app.use(express.json());
//API Endpoints

// app.use(router);
app.listen(port, () => console.log(`listening on localhost ${port}`));
