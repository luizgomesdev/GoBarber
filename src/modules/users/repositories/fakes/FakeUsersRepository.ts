import { uuid } from 'uuidv4';

import UserModel from '@modules/users/infra/typeorm/entities/UserModel';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
    private users: UserModel[] = [];

    public async findById(id: string): Promise<UserModel | undefined> {
        const user = this.users.find(user => user.uuid === id);

        return user;
    }
    public async findByEmail(email: string): Promise<UserModel | undefined> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    public async create({ name, email, password }: ICreateUserDTO): Promise<UserModel> {
        const user = new UserModel();

        Object.assign(user, { uuid: uuid(), name, email, password });

        this.users.push(user);

        return user;
    }

    public async save(user: UserModel): Promise<UserModel> {
        const index = this.users.findIndex(user => user.uuid == user.uuid);

        this.users[index] = user;

        return user;
    }
}

export default UsersRepository;
