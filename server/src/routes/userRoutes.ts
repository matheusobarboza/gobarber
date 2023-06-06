import { Router } from 'express'
import { CreateUserController } from '../controllers/user/CreateUserController'
import { UpdateUserController } from '../controllers/user/UpdateUserController'
import { upload } from '../config/multer'
import { AuthUserController } from '../controllers/user/AuthUserController'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'

const router = Router()

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const authUserController = new AuthUserController()
const authMiddleware = new AuthMiddleware()

router.post("/users", createUserController.handle)
router.put("/users",  upload.single('avatar_url'), authMiddleware.auth, updateUserController.handle)
router.post("/users/auth", authUserController.handle)

export default router