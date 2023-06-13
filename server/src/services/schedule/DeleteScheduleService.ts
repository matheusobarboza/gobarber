import { SchedulesRepository } from "../../repositories/SchedulesRepositoy"

export class DeleteScheduleService {
  async execute(id: string) {
    const schedulesRepository = new SchedulesRepository()
    
    const checkExists = await schedulesRepository.findById(id)

    if (!checkExists) {
      throw new Error("Schedule  does not exists!")
    }

    const schedule = await schedulesRepository.delete(id)

    return schedule
  }
}