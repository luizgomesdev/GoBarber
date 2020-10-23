import AppointmentModel from '@modules/appointments/infra/typeorm/entities/AppointmentModel';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<AppointmentModel>;
    findByDate(date: Date): Promise<AppointmentModel | undefined>;
}
