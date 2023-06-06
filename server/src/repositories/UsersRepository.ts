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

  async findUserById(id: string) {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async update(name: string, avatar_url: string, user_id: string) {
    const user = await prisma.users.update({
      where: {
        id: user_id
      },
      data: {
        name,
        avatar_url,
      }
    })
    return user
  }

  async updatePassword(newPassword: string, user_id: string) {
    const result = await prisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        password: newPassword,
      },
    });

    return result;
  }
}