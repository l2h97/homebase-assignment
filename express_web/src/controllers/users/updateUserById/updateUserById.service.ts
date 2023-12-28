import { Request } from "express";
import { PrismaService } from "../../../services/prismaService/prismaService";
import { Service } from "typedi";
import { CreateUserPayload } from "../createUser/createUser.service";
import { emailValidator } from "../../../validators/email.validator";
import { BadRequestException } from "../../../exceptions/badRequest.exception";
import { NotFoundException } from "../../../exceptions/notFound/notFound.exception";
import { UserTransform } from "../userTransform/userTransform";

@Service()
export class UpdateUserByIdService {
  constructor(private prismaService: PrismaService) {}

  async execute(request: Request) {
    const { id, email, fullName, address } =
      this.validateAndTransformPayload(request);

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("USER_IS_NOT_FOUND", "User ");
    }

    const existsEmail =
      email &&
      (await this.prismaService.user.findUnique({
        where: {
          email,
        },
      }));
    if (existsEmail && user.id !== existsEmail.id) {
      throw new BadRequestException(
        "EMAIL_ALREADY_EXISTS",
        "Email already exists",
      );
    }

    const userUpdated = await this.prismaService.user.update({
      data: {
        email,
        fullName,
        address,
      },
      where: {
        id,
      },
    });

    const userTransform = new UserTransform(userUpdated);
    return userTransform.transform();
  }

  validateAndTransformPayload(
    request: Request,
  ): Partial<CreateUserPayload> & { id: number } {
    const { body, params } = request;

    const id = Number(params.id) || 0;
    if (!id) {
      throw new BadRequestException("ID_IS_EMPTY", "ID must be not empty");
    }

    const email = body.email?.toString();

    const isEmail = email ? emailValidator(email) : true;
    if (!isEmail) {
      throw new BadRequestException("EMAIL_IS_INVALID", "Email is invalid");
    }

    const fullName = body.fullName?.toString();

    return {
      id,
      email,
      fullName,
      address: body.address?.toString(),
    };
  }
}
