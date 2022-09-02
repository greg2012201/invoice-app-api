import { isAuth } from 'middleware/isAuth';
import mongoose from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { IUser, IMe } from 'types';
import { sendRefreshToken } from 'utils/sendRefreshToken';
import { createAccessToken, createRefreshToken } from 'utils/createToken';
import { Response } from 'express';

interface LoginResponse extends IUser {
  accessToken: string;
}

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
      { models: { User } }: { models: { User: any } },
      info: any
    ): Promise<boolean | any> => {
      try {
        const hashedPassword = await hash(args.password, 12);
        await new User({
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
    login: async (
      parent: any,
      args: { password: string; email: string },
      { models: { User }, res }: { models: { User: any }; res: Response },
      info: any
    ): Promise<LoginResponse | any> => {
      try {
        const user: IUser = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error('could not find user');
        }
        const valid = await compare(args.password, user.password);
        if (!valid) {
          throw new Error('bad password');
        }
        sendRefreshToken(res, createRefreshToken(user));

        return {
          accessToken: createAccessToken(user),
          user,
        };
      } catch (e) {
        console.log(`Error happened at Query login ${args}`);
        return e;
      }
    },
  },
};
export default user;
