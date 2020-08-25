import AppointmentModel from '../models/AppointmentModel';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AppointmentModel)
class AppointmentsRepository extends Repository<AppointmentModel> {
    public async findByDate(date: Date): Promise<AppointmentModel | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
