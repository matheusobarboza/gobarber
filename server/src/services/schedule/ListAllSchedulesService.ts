import { SchedulesRepository } from "../../repositories/SchedulesRepositoy";

export class ListAllSchedulesService {
  async execute(date: Date) {
    const schedulesRepository = new SchedulesRepository()

    const schedules = schedulesRepository.findAll(date)

    return schedules
  }
}