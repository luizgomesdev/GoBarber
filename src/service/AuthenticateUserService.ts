import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import UserModel from '../models/UserModel';

interface RequestDTO {
    email: string;
    password: string;
}

interface Response {
    user: UserModel;
    token: String;
}

export default class AuthenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<Response> {
        const usersRepository = getRepository(UserModel);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatached = await compare(password, user.password);

        if (!passwordMatached) {
            throw new Error('Incorrect email/password combination.');
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.uuid,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { user, token };
    }
}
