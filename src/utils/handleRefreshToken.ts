import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import User from 'models/user';
import { IUser } from 'types';
import { createAccessToken, createRefreshToken } from './createToken';
import { sendRefreshToken } from './sendRefreshToken';

interface Args {
  req: Request;
  res: Response;
}

export const handleRefreshToken = async ({ req, res }: Args) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: '' });
  }

  const user: IUser | null = await User.findOne({ id: payload.userId });

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }
  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};
