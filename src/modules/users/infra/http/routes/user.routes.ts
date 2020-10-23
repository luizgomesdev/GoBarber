import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const UsersRoutes = Router();
const upload = multer(uploadConfig);

UsersRoutes.post('/', usersController.create);

UsersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

export default UsersRoutes;
