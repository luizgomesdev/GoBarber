import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';
import UserModel from '../models/UserModel';

import uploadConfig from '../config/upload';

import AppError from '../errors/AppErros';

interface RequestDTO {
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFilename,
    }: RequestDTO): Promise<UserModel> {
        const usersRepository = getRepository(UserModel);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Only authentucated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            const userAvatarFileExits = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExits) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}
