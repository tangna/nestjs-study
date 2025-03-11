import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  getHello(): string {
    console.log(new Date());
    return this.appService.getHello();
  }

  // @Get()
  // async getHelloByCache(): Promise<string> {
  //   let hello = await this.cacheManager.get<string>('key');
  //   if (!hello) {
  //     hello = this.appService.getHello();
  //     await this.cacheManager.set('key', hello, 5000);
  //     console.log('set cache', new Date());
  //   }
  //   return hello;
  // }
}
