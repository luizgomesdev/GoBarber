import { uuid } from 'uuidv4';

import UserTokenModel from '@modules/users/infra/typeorm/entities/UserToken';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
    private userTokens: UserTokenModel[] = [];

    public async generate(user_id: string): Promise<UserTokenModel> {
        const userToken = new UserTokenModel();

        Object.assign(userToken, {
            uuid: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(
        token: string,
    ): Promise<UserTokenModel | undefined> {
        const userToken = this.userTokens.find(
            findToken => findToken.token === token,
        );

        return userToken;
    }
}

export default FakeUserTokensRepository;
