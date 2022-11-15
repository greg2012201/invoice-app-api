import mongoose from 'mongoose';
import {
  describe,
  expect,
  it,
  beforeAll,
  afterAll,
  beforeEach,
} from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import models from 'models';
import dayjs from 'dayjs';
import { MongoMemoryServer as MongoMemoryServerType } from 'mongodb-memory-server-core/lib/MongoMemoryServer';
import { generateInvoiceNumber } from './generateInvoiceNumber';
import type { TInvoiceNumberData } from 'types';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const { Invoice } = models;

const mockSellerRef = new mongoose.Types.ObjectId();

describe('generateInvoiceNumber', () => {
  let mongoDBMock: MongoMemoryServerType;

  beforeAll(async () => {
    mongoDBMock = await MongoMemoryServer.create();
    const uri = mongoDBMock.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    mongoose.disconnect();
    mongoDBMock.stop();
  });
  it('should create number correctly regarding on data from db', async () => {
    const invoiceMock = {
      issuedAt: dayjs('10/02/2022'),
      invoiceNumber: '1/10/2022',
      shortInvoiceNumber: 1,
      seller: mockSellerRef,
    };
    const secondInvoiceMock = {
      issuedAt: dayjs('10/08/2022'),
      invoiceNumber: '2/10/2022',
      shortInvoiceNumber: 2,
      seller: mockSellerRef,
    };
    await Promise.all([
      new Invoice(invoiceMock).save(),
      new Invoice(secondInvoiceMock).save(),
    ]);
    const mockDate = dayjs().format('MM/DD/YYYY');
    const newInvoiceNumberData: TInvoiceNumberData | null =
      await generateInvoiceNumber(new Date(mockDate), mockSellerRef);
    expect(newInvoiceNumberData?.invoiceNumber).toEqual(
      `1/${dayjs().month() + 1}/2022`
    );
  });
  it('should create next invoice number in the order in the same month', async () => {
    const invoiceMock = {
      issuedAt: dayjs('10/02/2022'),
      invoiceNumber: '1/10/2022',
      shortInvoiceNumber: 1,
      seller: mockSellerRef,
    };
    const secondInvoiceMock = {
      issuedAt: dayjs('10/08/2022'),
      invoiceNumber: '2/10/2022',
      shortInvoiceNumber: 2,
      seller: mockSellerRef,
    };
    await Promise.all([
      new Invoice(invoiceMock).save(),
      new Invoice(secondInvoiceMock).save(),
    ]);
    const mockDate = dayjs('10-31-2022', 'MM/DD/YYYY').format('MM/DD/YYYY');
    const newInvoiceNumberData: TInvoiceNumberData | null =
      await generateInvoiceNumber(new Date(mockDate), mockSellerRef);
    expect(newInvoiceNumberData?.invoiceNumber).toEqual(`3/10/2022`);
  });
});
