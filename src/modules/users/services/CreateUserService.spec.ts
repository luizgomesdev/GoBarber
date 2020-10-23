import AppError from '@shared/errors/AppErros';

import FakeUsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '1234',
        });

        expect(user).toHaveProperty('uuid');
    });

    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        await createUser.execute({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '1234',
        });
        expect(
            createUser.execute({
                name: 'Jhon Doe',
                email: 'jhondoe@example.com',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
