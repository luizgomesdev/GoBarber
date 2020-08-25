// src/routes/index.ts
import { Router } from 'express';

import appointmentsRoutes from './appointmentsRoutes';
import UsersRoutes from './usersRoutes';
import SessionsRoutes from './sessionsRoutes';

const routes = Router();

routes.use('/sessions', SessionsRoutes);
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', UsersRoutes);

export default routes;
