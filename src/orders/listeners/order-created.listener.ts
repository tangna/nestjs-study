import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';
import { ORDER_EVENT } from 'src/common/constant';

@Injectable()
export class OrderCreatedListener {
  private readonly logger = new Logger(OrderCreatedListener.name);

  @OnEvent(ORDER_EVENT.CREATED)
  handleOrderCreatedEvent(event: OrderCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    this.logger.log('receive event: ', event);
  }
}
