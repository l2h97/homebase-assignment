import { NextFunction, Request, Response } from "express";
import { uuidGenerator } from "../pkgs/uuidGenerator";
import { LoggerService } from "../services/loggerService/loggerService";

export const correlationMiddleware = (logger: LoggerService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["correlationId"]) {
      const correlationId = uuidGenerator();
      req.headers["correlationId"] = correlationId;
      res.setHeader("correlationId", correlationId);
      logger.setCorrelation = correlationId;
    }

    next();
  };
};
