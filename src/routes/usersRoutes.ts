import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UserController from '../controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const UsersRoutes = Router();
const upload = multer(uploadConfig);

UsersRoutes.post('/', UserController.create);
UsersRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    UserController.update,
);

export default UsersRoutes;
