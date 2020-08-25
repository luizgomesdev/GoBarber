import { Router } from 'express';

import SessionController from '../controllers/SessionsController';

const SessionsRoutes = Router();

SessionsRoutes.post('/', SessionController.validade);

export default SessionsRoutes;
