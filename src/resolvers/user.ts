import { isAuth } from 'middleware/isAuth';
import mongoose from 'mongoose';
import { IUser, IMe } from 'types';

const user = {
  Query: {
    getMe: isAuth(
      async (
        parent: any,
        args: null,
        { models: { User }, me }: { models: { User: any }; me: IMe },
        info: any
      ): Promise<IUser | any> => {
        try {
          const user: IUser = await User.findOne({ _id: me.id });
          if (!user) {
            throw new Error('User not found');
          }
          return user;
        } catch (e) {
          console.log(`Error happened at Query getContractors ${args}`);
          return e;
        }
      }
    ),
  },
};
export default user;
