import { Request, Response } from "express";
import { HTTP_STATUS_CODE } from "../interfaces/httpStatusCode.interface";

type ErrorCode = "NOT_FOUND_ROUTER" | "INTERNAL_SERVER_ERROR";

type ExceptionResponse = {
  correlationId?: string;
  errorCode: ErrorCode | string;
  status: HTTP_STATUS_CODE;
  path: string;
  message: string;
};

export class HttpException extends Error {
  constructor(
    private errorCode: ErrorCode | string,
    public message: string,
    private status: HTTP_STATUS_CODE,
  ) {
    super(message);
  }
  response(req: Request, res: Response<ExceptionResponse>) {
    return res.status(this.status).json({
      correlationId: req.headers["correlationId"],
      errorCode: this.errorCode,
      status: this.status,
      path: req.url,
      message: this.message,
    });
  }
}
