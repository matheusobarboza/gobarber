import { isBefore, startOfHour } from "date-fns"
import { SchedulesRepository } from "../../repositories/SchedulesRepositoy"
import { IUpdate } from "../../interfaces/ScheduleInterface"

export class UpdateScheduleService {
  async execute({ id, date, user_id }: IUpdate) {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)

    console.log('id', id)

    if (isBefore(hourStart, new Date())) {
      throw new Error("It is not allowed to schedule old date")
    }

    const schedulesRepository = new SchedulesRepository()

    const checkIsAvailable = await schedulesRepository.find(hourStart, user_id)

    if (checkIsAvailable) {
      throw new Error("Schedule date is not available!")
    }

    const schedule = await schedulesRepository.update(id, date)

    return schedule
  }
}