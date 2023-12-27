import { Request, Response } from "express";
import { AppService } from "./app.service";
import { HTTP_STATUS_CODE } from "../interfaces/httpStatusCode.interface";
import { Controller } from "../decorators/controller.decorator";
import { Get } from "../decorators/routes.decorator";
import { Service } from "typedi";

@Controller("")
@Service()
export class AppController {
  constructor(private appService: AppService) {}

  @Get("/")
  async get(req: Request, res: Response) {
    const result = this.appService.getSource();
    return res.status(HTTP_STATUS_CODE.OK).json(result);
  }
}
