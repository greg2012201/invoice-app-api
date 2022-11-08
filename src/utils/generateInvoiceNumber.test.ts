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

const { Invoice } = models;
const invoiceMock = {
  issuedAt: dayjs('10/02/2022'),
  invoiceNumber: '1/10/2022',
  shortInvoiceNumber: 1,
};

describe('generateInvoiceNumber', () => {
  let mongoDBMock: MongoMemoryServerType;

  beforeAll(async () => {
    mongoDBMock = await MongoMemoryServer.create();
    const uri = mongoDBMock.getUri();
    await mongoose.connect(uri);
  });
  beforeEach(async () => {
    await new Invoice(invoiceMock).save();
  });

  afterAll(async () => {
    mongoose.disconnect();
    mongoDBMock.stop();
  });
  it('should create number correctly regarding on data from db', async () => {
    const mockDate = dayjs();
    // await generateInvoiceNumber(mockDate);
    // const result = await Invoice.find();
  });
});
