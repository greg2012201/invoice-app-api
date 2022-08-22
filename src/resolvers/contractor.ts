import mongoose from 'mongoose';

export default {
  Query: {
    getContractors: async (
      parent: any,
      args: any,
      { models: { Contractor } }: { models: { Contractor: any } },
      info: any
    ) => {
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
      args: any,
      { models: { Contractor } }: { models: { Contractor: any } },
      info: any
    ) => {
      try {
        await new Contractor({
          _id: new mongoose.Types.ObjectId(),
          ...args,
        }).save();
        return true;
      } catch (e) {
        console.log(`Error happened at Query addContractor ${args}`);
        return e;
      }
    },
  },
};
