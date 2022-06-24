
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from './schema/index.js'
import resolvers from './resolvers/index.js'

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 8801;
const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  autoIndex: true,
});
// Graphql Server
 const server = new ApolloServer({ typeDefs :schema , resolvers });
// Middleware
app.use(express.json());
//API Endpoints
await server.start();
// app.use(router);
app.listen(port, () => console.log(`listening on localhost ${port}`));
server.applyMiddleware({ app, path: '/graphql' });
