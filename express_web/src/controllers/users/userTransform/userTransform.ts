import { User } from "@prisma/client";

export type UserDto = {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
};

export class UserTransform {
  constructor(private user: User) {}

  transform(): UserDto {
    return {
      id: this.user.id,
      email: this.user.email,
      fullName: this.user.fullName,
      createdAt: new Date(this.user.createdAt).toISOString(),
      updatedAt: new Date(this.user.updatedAt).toISOString(),
    };
  }
}
