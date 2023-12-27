import { Request } from "express";
import { PrismaService } from "../../../services/prismaService/prismaService";
import { Service } from "typedi";
import { BadRequestException } from "../../../exceptions/badRequest.exception";
import { emailValidator } from "../../../validators/email.validator";
import { UserTransform } from "../userTransform/userTransform";

export type CreateUserPayload = {
  email: string;
  fullName: string;
  address?: string;
};

@Service()
export class CreateUserService {
  constructor(private prismaService: PrismaService) {}

  async execute(request: Request) {
    const payload = this.validateAndTransformPayload(request);

    const existsUser = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (existsUser) {
      throw new BadRequestException(
        "USER_ALREADY_EXISTS",
        "User already exists",
      );
    }

    const user = await this.prismaService.user.create({
      data: {
        email: payload.email,
        fullName: payload.fullName,
        address: payload.address,
      },
    });

    const userTransform = new UserTransform(user);
    return userTransform.transform();
  }

  validateAndTransformPayload(request: Request): CreateUserPayload {
    const { body } = request;

    const email = body.email?.toString() || "";
    if (!email) {
      throw new BadRequestException("EMAIL_IS_REQUIRED", "Email is required");
    }

    const isEmail = emailValidator(email);
    if (!isEmail) {
      throw new BadRequestException("EMAIL_IS_INVALID", "Email is invalid");
    }

    const fullName = body.fullName?.toString() || "";
    if (!fullName) {
      throw new BadRequestException("EMAIL_IS_INVALID", "Email is invalid");
    }

    return {
      email,
      fullName,
      address: body.address?.toString(),
    };
  }
}
