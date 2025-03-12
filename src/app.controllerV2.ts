import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from './logger/my-logger.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppControllerV2 {
  private readonly logger = new Logger(AppControllerV2.name);

  constructor(
    private readonly appService: AppService,
    private readonly myLogger: MyLogger,
  ) {
    this.myLogger.setContext('CatsService');
  }

  @Version('2')
  @Get('')
  getHello(): string | undefined {
    // You can call all the default methods
    this.myLogger.warn('About to return cats!');
    // And your custom methods
    this.myLogger.customLog();
    return this.appService.getHelloV2();
  }
}
