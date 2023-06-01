import { Router } from 'express'
import multer from 'multer'
import { CreateUserController } from '../controllers/user/CreateUserController'
import { UpdateUserController } from '../controllers/user/UpdateUserController'
import { upload } from '../config/multer'
import { AuthUserController } from '../controllers/user/AuthUserController'

const router = Router()

// const upload = multer(uploadConfig.upload("./tmp"))

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const authUserController = new AuthUserController()

router.post("/users", createUserController.handle)
router.put("/users",  upload.single('avatar_url'), updateUserController.handle)
router.post("/users/auth", authUserController.handle)

export default router