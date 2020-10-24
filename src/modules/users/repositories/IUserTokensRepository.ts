import UserTokenModel from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
    generate(user_id: string): Promise<UserTokenModel>;
    findByToken(token: string): Promise<UserTokenModel | undefined>;
}
