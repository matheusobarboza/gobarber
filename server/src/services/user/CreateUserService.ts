import { hash } from "bcrypt"
import { ICreate } from "../../interfaces/UsersInterface"
import { prisma } from "../../prisma"
import { UsersRepository } from "../../repositories/UsersRepository"

export class CreateUserService {
  async execute ({ name, email, password }: ICreate) {
    if (!email) {
      throw new Error("Email or password invalid")
    }

    const usersRepository = new UsersRepository()

    const userAlreadyExists = await usersRepository.findUserByEmail(email)

    if (userAlreadyExists) {
      throw new Error("User/email already exists!")
    }

    const passwordHash = await hash(password, 8)

    const user = await usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return user
  }
}