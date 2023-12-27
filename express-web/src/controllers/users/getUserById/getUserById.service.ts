import { Request } from "express";
import { PrismaService } from "../../../services/prismaService/prismaService";
import { Service } from "typedi";
import { BadRequestException } from "../../../exceptions/badRequest.exception";
import { NotFoundException } from "../../../exceptions/notFound/notFound.exception";
import { UserTransform } from "../userTransform/userTransform";

@Service()
export class GetUserByIdService {
  constructor(private prismaService: PrismaService) {}

  async execute(request: Request) {
    const { params } = request;
    const id = Number(params.id) || 0;

    if (!id) {
      throw new BadRequestException("ID_IS_EMPTY", "ID must be not empty");
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException("USER_IS_NOT_FOUND", "User ");
    }

    const userTransform = new UserTransform(user);
    return userTransform.transform();
  }
}
