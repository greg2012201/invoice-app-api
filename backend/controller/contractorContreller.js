import Contractors from '../models/dbContractor.js';
export const createContractor = (req, res) => {
  const contractor = req.body;

  Contractors.create(contractor, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};
export const getListOfContractors = (req, res) => {
  Contractors.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
