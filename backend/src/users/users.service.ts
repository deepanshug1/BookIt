import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as mongodb from 'mongodb';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(email: string, password: string) {
    const User = this.repo.create({ email, password });
    //hooks executed
    return this.repo.save(User);
  }

  findUser(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ _id: new mongodb.ObjectId(id) });
  }

  findAllUsers(email: string) {
    return this.repo.find({ where: { email } });
  }
}
