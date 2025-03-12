import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './users/entities/user.entity';
import { RoleEntity } from './users/entities/role.entity';
import { Response } from 'express';
// import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('')
  getHello(): string {
    this.logger.log('Doing something with timestamp here ->');
    this.logger.log('v1', new Date());
    return this.appService.getHello();
  }

  @Get('cookie')
  getCookie(@Res({ passthrough: true }) response: Response) {
    response.cookie('cookie', Date.now());
  }

  @Get('entity')
  findOne(): UserEntity {
    return new UserEntity({
      id: 1,
      firstName: 'Kamil',
      lastName: 'Mysliwiec',
      password: 'password',
      role: new RoleEntity({ id: 1, name: 'admin' }),
    });
  }

  // @Get()
  // async getHelloByCache(): Promise<string> {
  //   let hello = await this.cacheManager.get<string>('key');
  //   if (!hello) {
  //     hello = this.appService.getHello();
  //     await this.cacheManager.set('key', hello, 5000);
  //     this.logger.log('set cache', new Date());
  //   }
  //   return hello;
  // }
}
