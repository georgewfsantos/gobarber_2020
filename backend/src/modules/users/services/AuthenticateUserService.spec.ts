import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Someone',
      email: 'someone@example.com',
      password: '132456',
    });

    const response = await authenticateUser.execute({
      email: 'someone@example.com',
      password: '132456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non-existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'someone@example.com',
        password: '132456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate user with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Someone',
      email: 'someone@example.com',
      password: '132456',
    });

    await expect(
      authenticateUser.execute({
        email: 'someone@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
