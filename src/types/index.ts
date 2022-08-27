import { Document } from 'mongoose';

export interface IContractor extends Document {
  name: string;
  nip: string;
  address: string;
  tel: string;
  email: string;
  /*    invoices: Array, */
}
