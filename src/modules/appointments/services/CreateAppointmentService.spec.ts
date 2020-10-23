import AppError from '@shared/errors/AppErros';

import { uuid } from 'uuidv4';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRespository from '@modules/appointments/repositories/fakes/FakeAppointmentsRespository';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRespository = new FakeAppointmentsRespository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRespository);

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: uuid(),
        });

        expect(appointment).toHaveProperty('uuid');
        expect(appointment.provider_id).toBe(appointment.provider_id);
    });

    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppointmentsRespository = new FakeAppointmentsRespository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRespository);

        const appointmentDate = new Date();

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: uuid(),
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: uuid(),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
