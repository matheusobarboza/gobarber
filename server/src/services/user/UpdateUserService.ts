import { s3 } from "../../config/aws"
import {v4 as uuid} from 'uuid'
import { IUpdate } from "../../interfaces/UsersInterface"
import { UsersRepository } from "../../repositories/UsersRepository"

export class UpdateUserService {
  async execute({ name, oldPassword, newPassword, avatar_url }: IUpdate) {
    try {
      const uploadImage = avatar_url?.buffer

      const uploadS3 = await s3.upload({
        Bucket: 'go-barber',
        Key: `${uuid()}-${avatar_url?.originalname}`,
        // ACL: 'public-read',
        Body: uploadImage,
      }).promise()

      const usersRepository = new UsersRepository()

    } catch(err) {
      throw new Error("Error an update the user!")
    }
  }
}