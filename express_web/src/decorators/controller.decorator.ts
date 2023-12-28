import { Request, Response, Router } from "express";
import { IRoutes } from "./routes.decorator";
import Container from "typedi";
import { LoggerService } from "../services/loggerService/loggerService";
import { correlationMiddleware } from "../middlewares/correlation.middleware";
import { RouterNotFoundException } from "../exceptions/notFound/routerNotFound.exception";
import { exceptionAsyncService } from "../utilities/exceptionAsyncService";

export enum META_KEY {
  BASE_PATH = "basePath",
  PATH = "path",
}

export const router = Router();

export const Controller = (basePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(META_KEY.BASE_PATH, basePath, target);

    if (!Reflect.hasMetadata(META_KEY.PATH, target)) {
      Reflect.defineMetadata(META_KEY.PATH, [], target);
    }

    const routes: IRoutes[] = Reflect.getMetadata(META_KEY.PATH, target);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance: any = Container.get(target);
    const loggerService = Container.get(LoggerService);
    routes.forEach((item) => {
      console.log(
        `\x1b[92m 👉 Router ${item.httpMethod.toUpperCase()} ${basePath}${
          item.path
        } created \x1b[0m`,
      );

      router[item.httpMethod](
        `/${basePath}${item.path}`,
        correlationMiddleware(loggerService),
        exceptionAsyncService(instance[item.methodName].bind(instance)),
      );
    });
  };
};
