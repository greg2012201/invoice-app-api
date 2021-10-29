import express from 'express';
import {
  createContractor,
  findContractor,
  getListOfContractors,
} from '../controller/contractorContreller.js';

const router = express.Router();

router.route('/getContractors').get(getListOfContractors);
router.route('/getContractor').get(findContractor);
router.route('/addContractor').post(createContractor);

export default router;
