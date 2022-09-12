import { ApolloServer } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from 'schema';
import resolvers from 'resolvers';
import models from 'models';
import { handleRefreshToken } from 'utils/handleRefreshToken';
dotenv.config();
const app = express();
const clientOrigin = process.env.CLIENT_ORIGIN;
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(cookieParser());
app.post('/refresh_token', (req, res) => handleRefreshToken({ req, res }));
const port = process.env.PORT || 8801;
const mongoUri: string | undefined = process.env.MONGO_DB_URI!;
mongoose.connect(mongoUri, { dbName: 'invoiceDB' });
// Graphql Server
let server = null;
const startServer = async () => {
  server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req, res }: { req: Request; res: Response }) => ({
      req,
      res,
      models,
    }),
  });
  await server.start();
  server.applyMiddleware({ app, cors: false });
};
startServer();
// Middleware
app.use(express.json());
//API Endpoints

// app.use(router);
app.listen(port, () => console.log(`listening on localhost ${port}`));
