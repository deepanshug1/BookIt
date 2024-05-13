import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { currentUserDecorator } from './decorators/current-user.decorator';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';

@UseInterceptors(new SerializeInterceptor(UserDto))
@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Get('/user')
  getCurrentUser(@currentUserDecorator() user: User | string) {
    if (!user) {
      return 'no currently Signedin User';
    }
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: createUserDto, @Session() Session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    return user;
  }

  @Post('/signin')
  async signInUser(@Body() body: createUserDto, @Session() Session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    return user;
  }

  @Post('/signout')
  signOutUser(@Session() Session: any) {
    Session.userId = null;
    return;
  }
}
