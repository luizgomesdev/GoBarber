import { getRepository, Repository } from 'typeorm';

import AppointmentModel from '@modules/appointments/infra/typeorm/entities/AppointmentModel';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<AppointmentModel>;

    constructor() {
        this.ormRepository = getRepository(AppointmentModel);
    }

    public async findByDate(date: Date): Promise<AppointmentModel | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<AppointmentModel> {
        const appointment = await this.ormRepository.create({
            provider_id,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
