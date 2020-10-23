import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import AppointmentModel from '@modules/appointments/infra/typeorm/entities/AppointmentModel';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class FakeAppointmentsRespository implements IAppointmentsRepository {
    private appointments: AppointmentModel[] = [];

    public async findByDate(date: Date): Promise<AppointmentModel | undefined> {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

        return findAppointment;
    }

    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<AppointmentModel> {
        const appointment = new AppointmentModel();

        Object.assign(appointment, { uuid: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default FakeAppointmentsRespository;
