import { Document, Types } from 'mongoose';

export interface IInvoice {
  _id: Types.ObjectId;
  serviceName: string;
  quantity: number;
  priceNet: number;
  valueNet: number;
  VATRate: string;
  sumVAT: number;
  grossValue: number;
  comments?: string;
  invoiceNumber: string;
  shortInvoiceNumber: number;
  issuedAt?: Date;
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
  invoices: IInvoice['_id'][];
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

export type TInvoiceNumberData = {
  invoiceNumber: string;
  shortInvoiceNumber: number;
};
