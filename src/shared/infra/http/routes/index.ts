// src/routes/index.ts
import { Router } from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointment.routes';
import UsersRoutes from '@modules/users/infra/http/routes/user.routes';
import SessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/sessions', SessionsRoutes);
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', UsersRoutes);

export default routes;
