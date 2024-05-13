import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      findAllUsers: (email: string) => Promise.resolve([]),
      createUser: (email: string, password: string) =>
        Promise.resolve({ id: 0, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(authService).toBeDefined();
  });

  it('can create a user with salted and hashed password', async () => {
    const user = await authService.signUp('1@1.com', 'abcdefg');
    expect(user.password).not.toEqual('abcdefg');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await authService.signUp('asdf@asdf.com', 'asdf');
    try {
      await expect(authService.signUp('asdf@asdf.com', 'asdf')).rejects.toThrow(
        BadRequestException,
      );
    } catch (err) {}
  });

  it('throws if signIn is called with an unused email', async () => {
    try {
      await expect(
        authService.signIn('asdflkj@asdlfkj.com', 'passdflkj'),
      ).rejects.toThrow(NotFoundException);
    } catch (err) {}
  });

  it('throws if an invalid password is provided', async () => {
    await authService.signUp('laskdjf@alskdfj.com', 'password');
    try {
      await expect(
        authService.signIn('laskdjf@alskdfj.com', 'laksdlfkj'),
      ).rejects.toThrow(BadRequestException);
    } catch (err) {}
  });
});
