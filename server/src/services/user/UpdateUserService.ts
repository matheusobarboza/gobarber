import { s3 } from "../../config/aws"
import {v4 as uuid} from 'uuid'
import { IUpdate } from "../../interfaces/UsersInterface"
import { UsersRepository } from "../../repositories/UsersRepository"
import { compare, hash } from "bcrypt"

export class UpdateUserService {
  async execute({ name, oldPassword, newPassword, avatar_url, user_id }: IUpdate) {
    let password
    const usersRepository = new UsersRepository()
    if (oldPassword && newPassword) {
      const findUserById = await usersRepository.findUserById(user_id)

      if (!findUserById) {
        throw new Error("User not found!")
      }
      const passwordMatch = compare(oldPassword, findUserById.password)

      if (!passwordMatch) {
        throw new Error("Password invalid")
      }

      password = await hash(newPassword, 10)

      await usersRepository.updatePassword(password, user_id)
    }

    if (avatar_url) {
      const uploadImage = avatar_url?.buffer
      const uploadS3 = await s3.upload({
        Bucket: 'gobarber',
        Key: `${uuid()}-${avatar_url?.originalname}`,
        Body: uploadImage,
      }).promise()

      await usersRepository.update(name, uploadS3.Location, user_id)
    }
    return {
      message: "User updated successfully!"
    }
  }
}