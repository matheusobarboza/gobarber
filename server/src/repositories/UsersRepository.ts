import { ICreate } from "../interfaces/UsersInterface";
import { prisma } from "../prisma";

export class UsersRepository {
  async create ({ name, email, password }: ICreate) {
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

  async update(name: string, newPassword: string, avatar_url: string) {
    const user = await prisma.users.update({
      where: {
        //provider filter here...
      },
      data: {
        name,
        password: newPassword,
        avatar_url,
      }
    })
    return user
  }
}