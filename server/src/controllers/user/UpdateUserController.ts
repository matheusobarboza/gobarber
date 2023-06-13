import { Response, Request } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";
import { UpdateUserService } from "../../services/user/UpdateUserService";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { name, oldPassword, newPassword } = req.body
    const { user_id } = req

    const updateUserService = new UpdateUserService()

    const user = await updateUserService.execute({
      name,
      oldPassword,
      newPassword,
      avatar_url: req.file,
      user_id,
    })

    return res.status(200).json(user)
  }
}