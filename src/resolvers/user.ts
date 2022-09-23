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
          const testUser = await User.find({ _id: me.id });
          const user: IUser = await User.findOne(
            { _id: me.id },
            { name: 1, email: 1 }
          ).lean();
          if (!user) {
            throw new Error('User not found');
          }
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (e) {
          console.log(`Error happened at Query getMe ${args}`);
          return e;
        }
      }
    ),
  },
  LoginResponse: {
    id: (parent: LoginResponse) => parent._id.toString(),
  },
  Mutation: {
    register: async (
      parent: any,
      args: { password: string; email: string; name: string },
      { models: { User }, res }: { models: { User: any }; res: Response },
      info: any
    ): Promise<boolean | any> => {
      try {
        const hashedPassword = await hash(args.password, 12);
        if (!hashedPassword) {
          throw new Error(`Invalid password ${args?.password}`);
        }
        if (!args?.email) {
          throw new Error(`Invalid email ${args?.email}`);
        }
        if (!args?.name) {
          throw new Error(`Invalid name ${args?.name}`);
        }
        const user = new User({
          _id: new mongoose.Types.ObjectId().toString(),
          name: args.name,
          email: args.email,
          password: hashedPassword,
        });
        await Promise.all([
          user.save(),
          sendRefreshToken(res, createRefreshToken(user)),
        ]);
        return createAccessToken(user);
      } catch (e) {
        console.log(`Error happened at Mutation register ${e}`);
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
        const user: IUser = await User.findOne({ email: args.email }).lean();
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
          email: user.email,
          _id: user._id.toString(),
        };
      } catch (e) {
        console.log(`Error happened at Mutation login ${args}`);
        return e;
      }
    },
    logout: async (parent: any, args: any, { res }: { res: Response }) => {
      try {
        await sendRefreshToken(res, '');
        return true;
      } catch (e) {
        console.log(`Error happened at Mutation logout ${e}`);
        return e;
      }
    },
  },
};
export default user;
