import { Request, Response } from 'express';
import AuthenticateUserService from '../service/AuthenticateUserService';

class SessionsController {
    public async validade(request: Request, response: Response): Promise<any> {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const token = await authenticateUser.execute({
            email,
            password,
        });

        return response.json(token);
    }
}

export default new SessionsController();
