import { Request, Response } from 'express';

import CreateUserService from '../service/CreateUserService';
import UpdateUserAvatar from '../service/UpdateUserAvatarService';

class UsersController {
    public async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        return response.json(user);
    }

    public async update(request: Request, response: Response) {
        const updateUserAvatar = new UpdateUserAvatar();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    }
}

export default new UsersController();
