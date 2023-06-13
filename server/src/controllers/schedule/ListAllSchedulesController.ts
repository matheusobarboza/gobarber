import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { ListAllSchedulesService } from "../../services/schedule/ListAllSchedulesService";

export class ListAllSchedulesController {
  async handle(req: Request, res: Response) {
    const { date } = req.query
    const parseDate = date ? parseISO(date.toString()) : new Date()

    const listAllSchedulesService = new ListAllSchedulesService()

    const schedules = await listAllSchedulesService.execute(parseDate)

    return res.json(schedules)
  }
}