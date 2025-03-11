import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nickName: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}
