import mongoose, { Model } from 'mongoose';
import { IContractor } from 'types';

const contractor = {
  Query: {
    getContractors: async (
      parent: any,
      args: null,
      {
        models: { Contractor },
      }: { models: { Contractor: Model<IContractor> } },
      info: any
    ): Promise<IContractor[] | any> => {
      try {
        return await Contractor.find({});
      } catch (e) {
        console.log(`Error happened at Query getContractors ${args}`);
        return e;
      }
    },
  },
  Mutation: {
    addContractor: async (
      parent: any,
      args: IContractor,
      {
        models: { Contractor },
      }: { models: { Contractor: Model<IContractor> } },
      info: any
    ): Promise<Boolean | any> => {
      try {
        await new Contractor({
          ...args,
          _id: new mongoose.Types.ObjectId(),
        }).save();
        return true;
      } catch (e) {
        console.log(`Error happened at Query addContractor ${args}`);
        return e;
      }
    },
  },
};
export default contractor;
