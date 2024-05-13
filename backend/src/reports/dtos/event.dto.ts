import { IsBoolean, IsString } from 'class-validator';

export class EventDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsString()
  imagePath: string;

  @IsString()
  date: string;

  @IsString()
  location: string;

  @IsBoolean()
  openBooking: boolean;
}
