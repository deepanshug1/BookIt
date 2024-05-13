import { IsEmail, IsOptional, IsString } from 'class-validator';

export class updateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  //   @IsOptional() is used because some attributes might not be passed
}
