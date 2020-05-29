import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email and/or password');
    }

    // user.password - password from the database
    // password - parameter from the execute method in this class ( password typed by user when trying to authenticate)

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error('Incorrect email and/or password');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
