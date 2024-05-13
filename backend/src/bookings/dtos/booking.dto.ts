import { IsEmail, IsNumber, IsString } from 'class-validator';

export class BookingDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  tickets: number;

  @IsString()
  event: string;
}
