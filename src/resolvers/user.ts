import { isAuth } from 'middleware/isAuth';
import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
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
          console.log(`Error happened at Query getMe ${args}`);
          return e;
        }
      }
    ),
  },
  Mutation: {
    register: async (
      parent: any,
      args: { password: string; email: string },
      { models: { User }, me }: { models: { User: any }; me: IMe },
      info: any
    ): Promise<boolean | any> => {
      try {
        const hashedPassword = await hash(args.password, 12);
        const newUser: IUser = await new User({
          _id: new mongoose.Types.ObjectId().toString(),
          email: args.email,
          password: hashedPassword,
        }).save();
        return true;
      } catch (e) {
        console.log(`Error happened at Query register ${args}`);
        return e;
      }
    },
  },
};
export default user;
