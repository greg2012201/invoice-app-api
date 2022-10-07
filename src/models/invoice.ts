import mongoose from 'mongoose';
import { IInvoice } from 'types';

const Schema = mongoose.Schema;

const invoiceSchema = new Schema<IInvoice>({
  serviceName: String,
  quantity: Number,
  priceNet: Number,
  valueNet: Number,
  VATRate: String,
  sumVAT: Number,
  grossValue: Number,
  comments: String,
  contractor: { type: Schema.Types.ObjectId, ref: 'Contractor' },
});

export default mongoose.model<IInvoice>('Invoice', invoiceSchema);
