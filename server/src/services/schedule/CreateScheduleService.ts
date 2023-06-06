import { ICreate } from "../../interfaces/ScheduleInterface"
import { getHours, isBefore, startOfHour } from "date-fns"
import { SchedulesRepository } from "../../repositories/SchedulesRepositoy"

export class CreateScheduleService {
  async execute ({ name, phone, date, user_id }: ICreate) {
    const schedulesRepository = new SchedulesRepository()

    const dateFormatted = new Date(date)

    const hourStart = startOfHour(dateFormatted)

    const hour = getHours(hourStart)
    if (hour <= 8 || hour >= 20) {
      throw new Error("Create Schedule between 9 and 19!")
    }

    if (isBefore(hourStart, new Date())) {
      throw new Error("It is not allowed to schedule old date!")
    }

    const checkIsAvailable = await schedulesRepository.find(
      hourStart,
      user_id,
    )

    if (checkIsAvailable) {
      throw new Error('Schedule date is not available');
    }

    const schedule = await schedulesRepository.create({
      name,
      phone,
      date: hourStart,
      user_id,
    })

    return schedule
  }
}