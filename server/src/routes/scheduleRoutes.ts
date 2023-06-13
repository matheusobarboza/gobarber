import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
import { CreateScheduleController } from '../controllers/schedule/CreateScheduleController'
import { ListAllSchedulesController } from '../controllers/schedule/ListAllSchedulesController'
import { UpdateScheduleController } from '../controllers/schedule/UpdateScheduleController'
import { DeleteScheduleController } from '../controllers/schedule/DeleteScheduleController'

const router = Router()

const authMiddleware = new AuthMiddleware()

const createSchedulesController = new CreateScheduleController()
const listAllSchedulesController = new ListAllSchedulesController()
const updateSchedulesController = new UpdateScheduleController()
const deleteSchedulesController = new DeleteScheduleController()

router.post("/schedules", authMiddleware.auth, createSchedulesController.handle)
router.get("/schedules", authMiddleware.auth, listAllSchedulesController.handle)
router.put("/schedules/:id", authMiddleware.auth, updateSchedulesController.handle)
router.delete("/schedules/:id", authMiddleware.auth, deleteSchedulesController.handle)

export default router