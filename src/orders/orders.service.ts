import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderCreatedEvent } from './events/order-created.event';
import { ORDER_EVENT } from 'src/common/constant';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  public orders: Order[] = [
    {
      id: 1,
      name: 'Order #1',
      description: 'Description order #1',
    },
    {
      id: 2,
      name: 'Order #2',
      description: 'Description order #2',
    },
  ];

  constructor(private eventEmitter: EventEmitter2) {}

  create(createOrderDto: CreateOrderDto) {
    this.logger.log(createOrderDto);
    const order = {
      id: this.orders.length + 1,
      ...createOrderDto,
    };
    this.orders.push(order);

    const orderCreatedEvent = new OrderCreatedEvent();
    orderCreatedEvent.name = order.name;
    orderCreatedEvent.description = order.description;
    this.eventEmitter.emit(ORDER_EVENT.CREATED, orderCreatedEvent);

    return order;
  }
}
