import { Request, Response } from "express";
import { DeleteScheduleService } from "../../services/schedule/DeleteScheduleService";

export class DeleteScheduleController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    const deleteScheduleService = new DeleteScheduleService()

    const schedule = deleteScheduleService.execute(id)

    return res.json(schedule)
  }
}