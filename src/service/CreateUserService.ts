import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UserModel from '../models/UserModel';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}
export default class CreateUserService {
    async execute({ name, email, password }: RequestDTO): Promise<UserModel> {
        const userRepository = getRepository(UserModel);

        const checkUserExist = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExist) {
            throw new Error('Email addres already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });


        await userRepository.save(user);

        delete user.password;

        return user;
    }
}
