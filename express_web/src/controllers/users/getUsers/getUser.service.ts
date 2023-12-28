import { Service } from "typedi";
import { PrismaService } from "../../../services/prismaService/prismaService";
import { Request } from "express";
import { UserDto, UserTransform } from "../userTransform/userTransform";

type GetUsersQuery = {
  page: number;
  take: number;
};

@Service()
export class GetUsersService {
  constructor(private prismaService: PrismaService) {}

  async execute(request: Request): Promise<UserDto[]> {
    const { page, take } = this.transformQuery(request);

    const skip = (page - 1) * take;
    const users = await this.prismaService.user.findMany({ skip, take });

    return users.map((item) => {
      const userTransform = new UserTransform(item);
      return userTransform.transform();
    });
  }

  transformQuery(request: Request): GetUsersQuery {
    const { query } = request;
    const page = Number(query.page) || 1;
    const take = Number(query.take) || 10;

    return {
      page,
      take,
    };
  }
}
