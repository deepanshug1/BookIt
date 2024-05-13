import { Expose, Transform } from 'class-transformer';

export class responseBookingDto {
  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  tickets: string;

  @Expose()
  event: string;

  @Transform(({ obj }) => {
    if (obj.user) {
      return obj.user.id;
    }
  })
  @Expose()
  userId: number;

  // @Transform(({ obj }) => obj.user.email)
  // @Expose()
  // userEmail: string;
}
