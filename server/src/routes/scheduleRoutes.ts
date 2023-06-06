import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
import { CreateScheduleController } from '../controllers/schedule/CreateScheduleController'

const router = Router()

const createSchedulesController = new CreateScheduleController()
const authMiddleware = new AuthMiddleware()

router.post("/schedules", authMiddleware.auth, createSchedulesController.handle)

export default router