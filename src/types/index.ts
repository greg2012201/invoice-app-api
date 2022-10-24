import { Schema } from 'mongoose';
import { Document, Types } from 'mongoose';
import Contractor from 'models/contractor';

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
  seller: IContractor['_id'];
  buyer: IContractor['_id'];
}
export interface IContractor extends Document {
  _id: Types.ObjectId;
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
  contractors: IContractor['_id'][];
}

export interface IMe {
  id: Types.ObjectId;
}
