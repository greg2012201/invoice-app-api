import dayjs from 'dayjs';
import models from 'models';
import { Types } from 'mongoose';

const { Invoice } = models;

export const generateInvoiceNumber = async (
  date: Date,
  sellerRef: Types.ObjectId
): Promise<string | null> => {
  const argMonth = dayjs(date).month() + 1;
  const argYear = dayjs(date).year();
  const foundInvoiceLastShortNumber = await Invoice.aggregate([
    { $match: { seller: sellerRef } },
    {
      $project: {
        issuedAt: 1,
        shortInvoiceNumber: 1,
        month: { $month: '$issuedAt' },
        year: { $year: '$issuedAt' },
      },
    },
    { $match: { month: argMonth, year: argYear } },
    { $sort: { shortInvoiceNumber: -1 } },
    { $project: { shortInvoiceNumber: 1 } },
    { $limit: 1 },
  ]);
  const invoiceLastShortNumber = foundInvoiceLastShortNumber[0];
  let newShortNumber = invoiceLastShortNumber ? invoiceLastShortNumber + 1 : 1;
  return `${newShortNumber}/${argMonth}/${argYear}`;
};
