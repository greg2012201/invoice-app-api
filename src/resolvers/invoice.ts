import dayjs from 'dayjs';
import { isAuth } from 'middleware/isAuth';
import { Model } from 'mongoose';
import { IInvoice, IMe, TInvoiceNumberData } from 'types';
import { generateInvoiceNumber } from 'utils/generateInvoiceNumber';

const invoice = {
  Mutation: {
    issueInvoice: isAuth(
      async (
        parent: any,
        args: IInvoice,
        { models: { Invoice } }: { models: { Invoice: Model<IInvoice> } },
        info: any
      ) => {
        try {
          // create buyer and seller and invoice
          return await new Invoice(args).save();
        } catch (e) {
          console.log(`Error happened at Mutation issueInvoice ${args}`);
          return e;
        }
      }
    ),
  },
  Query: {
    getInvoiceNumber: isAuth(
      async (
        parent: any,
        args: IInvoice,
        {
          models: { Invoice },
          me,
        }: { models: { Invoice: Model<IInvoice> }; me: IMe },
        info: any
      ) => {
        try {
          const invoiceNumberData = await generateInvoiceNumber(
            new Date(dayjs().format('MM/DD/YYYY')),
            me.id
          );

          if (!invoiceNumberData?.invoiceNumber) {
            throw new Error('Could not generate invoice number');
          }
          return invoiceNumberData.invoiceNumber;
        } catch (e) {
          console.log(`Error happened at Mutation issueInvoice ${args}`);
          return e;
        }
      }
    ),
  },
};

export default invoice;
