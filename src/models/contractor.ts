import mongoose from 'mongoose';
import { IContractor } from 'types';

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  serviceName: String,
  quantity: Number,
  priceNet: Number,
  valueNet: Number,
  VATRate: String,
  sumVAT: Number,
  grossValue: Number,
  comments: String,
});

const contractorSchema = new Schema<IContractor>(
  {
    name: String,
    nip: String,
    address: String,
    tel: String,
    email: String,
    invoices: [invoiceSchema],
  },
  {
    collection: 'Contractor',
    timestamps: true,
  }
);

export default mongoose.model<IContractor>('Contractor', contractorSchema);
