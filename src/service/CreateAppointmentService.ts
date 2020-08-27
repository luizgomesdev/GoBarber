import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentModel from '../models/AppointmentModel';
import AppointmentsRepository from '../repositories/AppointmentRepository';

import AppError from '../errors/AppErros';

interface RequestDTO {
    provider_id: string;
    date: Date;
}

export default class CreateAppointmentService {
    public async execute({
        provider_id,
        date,
    }: RequestDTO): Promise<AppointmentModel> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameData = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameData) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}
