import { getRepository, Repository } from 'typeorm';

import UserModel from '@modules/users/infra/typeorm/entities/UserModel';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<UserModel>;

    constructor() {
        this.ormRepository = getRepository(UserModel);
    }

    public async findById(id: string): Promise<UserModel | undefined> {
        const user = this.ormRepository.findOne(id);

        return user;
    }
    public async findByEmail(email: string): Promise<UserModel | undefined> {
        const user = this.ormRepository.findOne({ where: { email } });

        return user;
    }

    public async create({ name, email, password }: ICreateUserDTO): Promise<UserModel> {
        const user = this.ormRepository.create({ name, email, password });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: UserModel): Promise<UserModel> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
