import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppControllerV2 {
  constructor(private readonly appService: AppService) {}

  @Version('2')
  @Get('')
  getHello(): string | undefined {
    console.log('v2', new Date());
    return this.appService.getHelloV2();
  }
}
