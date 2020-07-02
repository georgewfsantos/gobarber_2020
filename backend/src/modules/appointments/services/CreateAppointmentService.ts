import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentIsTaken = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentIsTaken) {
      throw new AppError('Date and time not available ');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
