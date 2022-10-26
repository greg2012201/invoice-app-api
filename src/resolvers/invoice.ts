import { isAuth } from 'middleware/isAuth';
import mongoose from 'mongoose';

const invoice = {
  Mutation: {
    issueInvoice: isAuth(async () => {}),
  },
};

export default invoice;
