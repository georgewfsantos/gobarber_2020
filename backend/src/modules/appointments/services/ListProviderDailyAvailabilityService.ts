import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
// import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDailyAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllOnDayByProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const firstAvailableHour = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + firstAvailableHour,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const thereIsAppointmentAtHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const appointmentDateAndTime = new Date(year, month - 1, day, hour);

      return {
        hour,
        available:
          !thereIsAppointmentAtHour &&
          isAfter(appointmentDateAndTime, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDailyAvailabilityService;
