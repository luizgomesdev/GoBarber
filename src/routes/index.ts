// src/routes/index.ts
import { Router } from 'express';
import appointmentsRoutes from './appointmentsRoutes';
import UsersRoutes from './usersRoutes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', UsersRoutes);

export default routes;
