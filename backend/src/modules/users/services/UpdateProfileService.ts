import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const emailIsTaken = await this.usersRepository.findByEmail(email);

    if (emailIsTaken && emailIsTaken.id !== user_id) {
      throw new AppError('E-mail address already taken');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'In order to update your password, you need to provide the current one',
      );
    }

    if (password && old_password) {
      const oldPasswordIsCorrect = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!oldPasswordIsCorrect) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
