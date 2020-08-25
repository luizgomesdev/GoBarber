import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', AppointmentController.getAll);

appointmentsRoutes.post('/', AppointmentController.create);

export default appointmentsRoutes;
