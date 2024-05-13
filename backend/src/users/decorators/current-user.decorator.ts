import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const currentUserDecorator = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.currentUser;
  },
);
