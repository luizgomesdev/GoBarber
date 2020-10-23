import UserModel from '@modules/users/infra/typeorm/entities/UserModel';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUserRepository {
    findById(id: string): Promise<UserModel | undefined>;
    findByEmail(email: string): Promise<UserModel | undefined>;
    create(data: ICreateUserDTO): Promise<UserModel>;
    save(user: UserModel): Promise<UserModel | undefined>;
}
