/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Prisma, PrismaClient } from "@prisma/client";

const mockUser: Prisma.UserCreateInput[] = [
  {
    email: "user1@mock.dev",
    fullName: "user 1"
  },
  {
    email: "user2@mock.dev",
    fullName: "user 2",
    address: "Ho Chi Minh city"
  }
]
const prismaClient = new PrismaClient();
const seed = async () => {


  const users = await prismaClient.user.findMany({
    where: {
      email: {
        in: mockUser.map((item) => item.email)
      }
    }
  })

  if (!users || users.length === 0) {
    await Promise.all(mockUser.map(async (item) => {
      await prismaClient.user.create({
        data: {
          email: item.email,
          fullName: item.fullName,
          address: item.address
        }
      })
    }))
    return;
  }

  return;
}

seed().then(async () => {
  await prismaClient.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prismaClient.$disconnect()
})
