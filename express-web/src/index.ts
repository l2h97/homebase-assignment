import "reflect-metadata";
import "./controllers/app.controller";
import "./controllers/users/users.controller";
import express from "express";
import { exceptionMiddleware } from "./middlewares/exception.middleware";
import { router } from "./decorators/controller.decorator";
import Container from "typedi";
import { ConfigService } from "./configs/config.service";
import bodyParser from "body-parser";
import { LoggerService } from "./services/loggerService/loggerService";

function bootstrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(router);

  const loggerService = Container.get(LoggerService);
  app.use(exceptionMiddleware(loggerService));

  const config = Container.get(ConfigService);
  const port = config.port;
  app.listen(port, () => {
    console.log(
      `\x1b[33m ⚡️ [server]: Server is running at http://localhost:${port} \x1b[0m`,
    );
    console.log(`\x1b[33m ❌ Press Ctrl + C to stop \x1b[0m`);
  });
}

bootstrap();
