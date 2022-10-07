import { Document, Types } from 'mongoose';

export interface IContractor extends Document {
  name: string;
  nip: string;
  address: string;
  tel: string;
  email: string;
  /*    invoices: Array, */
}
export type IContractorRef = {
  type: Types.ObjectId;
  ref: string;
};
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  contractors: IContractorRef[];
}

export interface IMe {
  id: Types.ObjectId;
}
