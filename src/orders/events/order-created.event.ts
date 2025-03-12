import { OmitType } from '@nestjs/mapped-types';
import { CreateOrderDto } from '../dto/create-order.dto';

export class OrderCreatedEvent extends OmitType(CreateOrderDto, [] as const) {}

// export class OrderCreatedEvent {
//   name: string;
//   description: string;
// }
