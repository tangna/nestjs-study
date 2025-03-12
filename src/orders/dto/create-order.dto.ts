import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
