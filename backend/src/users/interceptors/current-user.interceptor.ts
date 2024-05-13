import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class currentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const id = request.session.userId;
    if (id) {
      const user = this.usersService.findUser(id);
      request.currentUser = user;
    }

    return next.handle();
  }
}
