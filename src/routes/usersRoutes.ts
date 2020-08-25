import { Router } from 'express';

import UserController from '../controllers/UsersController';

const UsersRoutes = Router();

UsersRoutes.post('/', UserController.create);

export default UsersRoutes;
