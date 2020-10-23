import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErros';

import AppointmentModel from '@modules/appointments/infra/typeorm/entities/AppointmentModel';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
    constructor(@inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({ provider_id, date }: ICreateAppointmentDTO): Promise<AppointmentModel> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameData = await this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameData) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            date: appointmentDate,
            provider_id,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
