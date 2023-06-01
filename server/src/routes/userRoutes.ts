import express, { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'

const router = Router()

const createUserController = new CreateUserController()

router.post("/user", createUserController.handle)

export default router