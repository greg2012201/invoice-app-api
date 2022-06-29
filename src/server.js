import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from './schema/index.js';
import resolvers from './resolvers/index.js';
import models from './models/index.js';

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 8801;
const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoUri, {
  dbName: 'invoiceDB',
  useNewUrlParser: true,
  autoIndex: true,
});
// Graphql Server
let apolloServer = null;
const startServer = async () => {
  apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: { models },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
};
startServer();
// Middleware
app.use(express.json());
//API Endpoints

// app.use(router);
app.listen(port, () => console.log(`listening on localhost ${port}`));
