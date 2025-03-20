import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import AppError from '../../domain/error/app_error';
import ApiResponse from '../../domain/interface/response/response';
import status_code from '../../domain/constants/status_code';


const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof AppError) {

    res.status(err.statusCode).json(
      ApiResponse.errorResponse(err.message, err.statusCode)
    );
    
  } else {

    res.status(status_code.INTERNAL_SERVER_ERROR).json(
      ApiResponse.errorResponse("Internal Server Error", status_code.INTERNAL_SERVER_ERROR)
    );
    
  };
}
export default errorHandler;