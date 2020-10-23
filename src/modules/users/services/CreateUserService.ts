import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErros';

import UserModel from '@modules/users/infra/typeorm/entities/UserModel';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute({ name, email, password }: ICreateUserDTO): Promise<UserModel> {
        const checkUserExist = await this.usersRepository.findByEmail(email);

        if (checkUserExist) {
            throw new AppError('Email addres already used.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
