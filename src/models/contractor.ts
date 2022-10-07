import mongoose from 'mongoose';
import { IContractor } from 'types';

const Schema = mongoose.Schema;

const contractorSchema = new Schema<IContractor>(
  {
    name: String,
    nip: String,
    address: String,
    tel: String,
    email: String,
    invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
  },
  {
    collection: 'Contractor',
    timestamps: true,
  }
);

export default mongoose.model<IContractor>('Contractor', contractorSchema);
