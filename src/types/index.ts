import { Document, Types } from 'mongoose';

export type TInvoice = {
  serviceName: string;
  quantity: number;
  priceNet: number;
  valueNet: number;
  VATRate: string;
  sumVAT: number;
  grossValue: number;
  comments: string;
};
export interface IContractor extends Document {
  name: string;
  nip: string;
  address: string;
  tel: string;
  email: string;
  invoices: TInvoice[];
}
export type TRef = {
  type: Types.ObjectId;
  ref: string;
};
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  contractors: TRef[];
}

export interface IMe {
  id: Types.ObjectId;
}
