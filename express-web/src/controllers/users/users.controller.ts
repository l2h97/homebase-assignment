import { Request, Response } from "express";
import { Controller } from "../../decorators/controller.decorator";
import { Delete, Get, Post, Put } from "../../decorators/routes.decorator";
import { Service } from "typedi";
import { GetUsersService } from "./getUsers/getUser.service";
import { HTTP_STATUS_CODE } from "../../interfaces/httpStatusCode.interface";
import { CreateUserService } from "./createUser/createUser.service";
import { UpdateUserByIdService } from "./updateUserById/updateUserById.service";
import { GetUserByIdService } from "./getUserById/getUserById.service";
import { DeleteUserByIdService } from "./deleteUserById/deleteUserById.service";

@Controller("users")
@Service()
export class UserController {
  constructor(
    private getUsersService: GetUsersService,
    private createUserService: CreateUserService,
    private updateUserByIdService: UpdateUserByIdService,
    private getUserByIdService: GetUserByIdService,
    private deleteUserByIdService: DeleteUserByIdService,
  ) {}

  @Get("/")
  async getUsers(req: Request, res: Response) {
    const users = await this.getUsersService.execute(req);
    return res.status(HTTP_STATUS_CODE.OK).json(users);
  }

  @Post("/")
  async createUser(req: Request, res: Response) {
    const users = await this.createUserService.execute(req);
    return res.status(HTTP_STATUS_CODE.OK).json(users);
  }

  @Get("/:id")
  async getUserById(req: Request, res: Response) {
    const users = await this.getUserByIdService.execute(req);
    return res.status(HTTP_STATUS_CODE.OK).json(users);
  }

  @Put("/:id")
  async updateUserById(req: Request, res: Response) {
    const users = await this.updateUserByIdService.execute(req);
    return res.status(HTTP_STATUS_CODE.OK).json(users);
  }

  @Delete("/:id")
  async deleteUserById(req: Request, res: Response) {
    await this.deleteUserByIdService.execute(req);
    return res.status(HTTP_STATUS_CODE.NO_CONTENT).json({});
  }
}
