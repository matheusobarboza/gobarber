import { Request, Response } from "express";
import { UpdateScheduleService } from "../../services/schedule/UpdateScheduleService";

export class UpdateScheduleController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { date } = req.body
    const user_id = req.user_id

    const updateScheduleService = new UpdateScheduleService()

    const schedule = await updateScheduleService.execute({
      id, 
      date, 
      user_id
    })

    return res.json(schedule)
  }
}