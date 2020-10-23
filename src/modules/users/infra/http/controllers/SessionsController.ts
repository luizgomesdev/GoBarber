import { Request, Response } from 'express';

import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SesstionsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService(container.resolve('AuthenticateUserService'));

        const token = await authenticateUser.execute({
            email,
            password,
        });

        return response.json(token);
    }
}
