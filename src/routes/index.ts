// src/routes/index.ts
import { Router } from 'express';
import appointmentsRoutes from './appointmentsRoutes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);

export default routes;
