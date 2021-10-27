import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Contractors from './dbContractor.js';
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
app.post('/addContractor', (req, res) => {
  const contractor = req.body;
  console.log(contractor);
  Contractors.create(contractor, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/getContractors', (req, res) => {
  Contractors.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// Listener
app.listen(port, () => console.log(`listening om localhost ${port}`));
