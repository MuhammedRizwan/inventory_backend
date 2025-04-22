import jwt, { JwtPayload } from 'jsonwebtoken';

export default class TokenService {

  generateAccessToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET as string);
  }
}