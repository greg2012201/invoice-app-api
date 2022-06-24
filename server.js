import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Contractor from './src/models/Contractor.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 8801;
const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  autoIndex: true,
});
// Midlewares
app.use(express.json());
//API Endpoints
app.get('/', (req, res) => res.status(200).send('hello world '));

// app.use(router);
app.listen(port, () => console.log(`listening on localhost ${port}`));
