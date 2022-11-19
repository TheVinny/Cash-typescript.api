import UserRepository from '@modules/users/repository/userRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { readFileSync } from 'fs';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import JWT from 'jsonwebtoken';
import IAuth from '../domain/interfaces/IAuth';

class CreateAuth {
  public async execute({ username, password }: IAuth): Promise<IAuth> {
    const repositoryUser = getCustomRepository(UserRepository);

    const hasUser = await repositoryUser.FindByUsername(username);

    if (!hasUser) throw new AppError('Username or password invalid', 401);

    const passwordEquals = await compare(password, hasUser?.password);

    if (!passwordEquals) throw new AppError('Username or password invalid');

    const absPath = path.resolve('./', 'jwt.auth.key').toString();

    const secret = readFileSync(absPath, 'utf-8').split('=')[1];

    const token = JWT.sign({ id: hasUser.id }, secret, { expiresIn: '1d' });

    return { ...hasUser, token };
  }
}

export default new CreateAuth();
