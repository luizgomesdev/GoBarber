import { Router, Request, Response } from 'express';

import AuthenticateController from '@modules/users/infra/http/controllers/SessionsController';

const authenticateController = new AuthenticateController();
const SessionsRoutes = Router();

SessionsRoutes.post('/', authenticateController.create);

export default SessionsRoutes;
