import { UserRequest } from "../interfaces/UsersInterface";
import { prisma } from "../prisma";

export class UsersRepository {
  async create ({ name, email, password }: UserRequest) {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    })

    return user
  }

  async findUserByEmail(email: string) {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    })
    return user
  }
}