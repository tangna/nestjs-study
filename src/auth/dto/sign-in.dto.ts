import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class SignInDto extends OmitType(CreateUserDto, ['email'] as const) {}
