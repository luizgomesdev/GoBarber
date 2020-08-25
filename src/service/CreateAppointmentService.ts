import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentModel from '../models/AppointmentModel';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface RequestDTO {
    provider: String;
    date: Date;
}

class CreateAppointmentService {
    public async execute({
        provider,
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
            throw Error('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
