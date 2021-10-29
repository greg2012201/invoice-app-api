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

export const findContractor = async (req, res) => {
  try {
    let result = await Contractors.aggregate([
      {
        $search: {
          autocomplete: {
            query: `${req.query.search}`,
            path: 'name',
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
    ]);

    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e);
  }
};
