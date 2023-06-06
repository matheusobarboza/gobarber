import { Response, Request } from "express";
import { CreateScheduleService } from "../../services/schedule/CreateScheduleService";

export class CreateScheduleController {
  async handle(req: Request, res: Response) {
    const { name, phone, date } = req.body
    const { user_id } = req

    const createScheduleService = new CreateScheduleService()

    const schedule = await createScheduleService.execute({
      name,
      phone,
      date,
      user_id,
    })

    return res.status(201).json(schedule)
  }
}