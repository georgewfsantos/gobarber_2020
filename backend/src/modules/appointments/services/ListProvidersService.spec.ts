import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers', async () => {
    const provider_1 = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const provider_2 = await fakeUsersRepository.create({
      name: 'Jhon Doe Second',
      email: 'johndoe_second@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jhon LoggedIn',
      email: 'john_logged_in@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([provider_1, provider_2]);
  });
});
