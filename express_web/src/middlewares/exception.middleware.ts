import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception";
import { InternalServerException } from "../exceptions/internalServer.exception";
import { LoggerService } from "../services/loggerService/loggerService";

export const exceptionMiddleware = (logger: LoggerService) => {
  return (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    logger.error("error::", err);

    if (err instanceof HttpException) {
      return err.response(req, res);
    }

    const internalServerException = new InternalServerException();
    return internalServerException.response(req, res);
  };
};
