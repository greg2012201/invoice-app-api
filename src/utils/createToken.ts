import { Jwt, sign } from 'jsonwebtoken';
import { IUser } from 'types';

export const createAccessToken = (user: IUser): string => {
  return sign(
    { userId: user._id.toString() },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '15m',
    }
  );
};

export const createRefreshToken = (user: IUser): string => {
  return sign(
    { userId: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};
