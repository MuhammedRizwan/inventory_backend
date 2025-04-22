import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import status_code from '../../domain/constants/status_code';
import ApiResponse from '../../domain/interface/response/response';
import response_message from '../../domain/constants/response_message';
import AppError from '../../domain/error/app_error';
import Token from '../../domain/constants/token_constants';


declare global {
  namespace Express {
    interface Request {
      user?:  any;
    }
  }
}

export default function JwtMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(status_code.UNAUTHORIZED).json(ApiResponse.errorResponse(response_message.ACCESS_TOKEN_MISSING, status_code.UNAUTHORIZED));
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    if (!decoded) {
      res.status(status_code.FORBIDDEN).json(ApiResponse.errorResponse(response_message.INVALID_TOKEN, status_code.FORBIDDEN));
      return
    }
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie(Token.ACCESS_TOKEN, { httpOnly: true });
    res.clearCookie(Token.REFRESH_TOKEN, { httpOnly: true });
    next(error);
  }
};
