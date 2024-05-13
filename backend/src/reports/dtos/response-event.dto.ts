import { Expose, Transform } from 'class-transformer';

export class responseEventDto {
  @Expose()
  name: string;

  @Expose()
  category: string;

  @Expose()
  description: string;

  @Expose()
  imagePath: string;

  @Expose()
  date: string;

  @Expose()
  location: string;

  @Expose()
  openBooking: boolean;

}
