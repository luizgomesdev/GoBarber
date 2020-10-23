import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsController = new AppointmentsController();
const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);

// appointmentsRoutes.get('/', async (request: Request, response: Response) => {

//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRoutes.post('/', appointmentsController.create);

export default appointmentsRoutes;
