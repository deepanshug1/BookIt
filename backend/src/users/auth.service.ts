import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify<string, string, number, Buffer>(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    const users = await this.usersService.findAllUsers(email);
    if (users.length > 0) {
      throw new BadRequestException(
        'user exists already with this email-id, please signin',
      );
    }
    //hashing and salting:

    const salt = randomBytes(8).toString('hex');

    const hash = await scrypt(password, salt, 32);

    const result = salt + '.' + hash.toString('hex');

    const user = this.usersService.createUser(email, result);

    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.findAllUsers(email);
    if (!user) {
      throw new NotFoundException('no user with this email, please signup');
    }

    const [salt, hash] = user.password.split('.');

    const checkhash = await scrypt(password, salt, 32);

    if (hash !== checkhash.toString('hex')) {
      throw new BadRequestException('incorrect password, please try again');
    }
    return user;
  }
}
