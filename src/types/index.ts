import { Document, Types } from 'mongoose';

export type TRef = {
  type: Types.ObjectId;
  ref: string;
};
export interface IInvoice {
  serviceName: string;
  quantity: number;
  priceNet: number;
  valueNet: number;
  VATRate: string;
  sumVAT: number;
  grossValue: number;
  comments: string;
  contractor: TRef;
}
export interface IContractor extends Document {
  name: string;
  nip: string;
  address: string;
  tel: string;
  email: string;
  invoices: TRef[];
}

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
