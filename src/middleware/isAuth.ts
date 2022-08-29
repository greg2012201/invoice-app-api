import { Request, Response } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

interface Context {
  req: Request;
  response: Response;
  payload: JwtPayload;
}

export const isAuth = ({ context }: { context: Context }, next: () => void) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('not authenticated');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error('not authenticated');
  }

  return next();
};
