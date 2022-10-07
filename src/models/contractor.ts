import mongoose from 'mongoose';
import { IContractor } from 'types';

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({});

const contractorSchema = new Schema<IContractor>(
  {
    name: String,
    nip: String,
    address: String,
    tel: String,
    email: String,
    /* invoices: Array, */
  },
  {
    collection: 'Contractor',
    timestamps: true,
  }
);

export default mongoose.model<IContractor>('Contractor', contractorSchema);
