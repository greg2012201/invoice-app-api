import express from 'express';
import {
  createContractor,
  getListOfContractors,
} from '../controller/contractorContreller.js';

const router = express.Router();

router.route('/getContractors').get(getListOfContractors);
router.route('/addContractor').post(createContractor);

export default router;
