import { Request, Response } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { IMe } from 'types';

interface Payload extends JwtPayload {
  userId: string;
}

interface Context {
  req: Request;
  response: Response;
  payload: Payload;
  me: IMe;
  models: any;
}
export const isAuth =
  (next: (parent: any, args: any, context: Context, info: any) => void) =>
  async (parent: any, args: any, context: Context, info: any) => {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
      throw new Error('not authenticated');
    }

    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

      context.payload = payload.userId;
      context.me = { id: payload.userId };
    } catch (err) {
      console.log(err);
      throw new Error('not authenticated');
    }

    return next(parent, args, context, info);
  };
