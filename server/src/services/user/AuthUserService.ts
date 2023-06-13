import { compare } from "bcrypt"
import { sign } from 'jsonwebtoken'
import { UsersRepository } from "../../repositories/UsersRepository"

interface IAuth {
  email: string
  password: string
}

export class AuthUserService {
  async execute({ email, password }: IAuth) {
    const usersRepository = new UsersRepository()

    const user = await usersRepository.findUserByEmail(email)

    if (!user) {
      throw new Error("Email/password is invalid!")
    }

    const passwordMatch = await compare(password, user?.password)

    if (!passwordMatch) {
      throw new Error("Email/password is invalid!")
    }

    //Gerar token
    let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN
    if (!secretKey) {
      throw new Error("There is not token key!")
    }
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      secretKey,
      {
        subject: user.id,
        expiresIn: "30d"
      }
    )

    return {
      token: token,
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
    }
  }
}