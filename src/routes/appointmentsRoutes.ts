import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.get('/', AppointmentController.getAll);

appointmentsRoutes.post('/', AppointmentController.create);

export default appointmentsRoutes;
