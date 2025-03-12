import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCacheInterceptor } from './common/CacheInterceptor';
import { Keyv } from 'keyv';
import { createKeyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { AppControllerV2 } from './app.controllerV2';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { BullModule } from '@nestjs/bullmq';
import { AudioModule } from './audio/audio.module';
import { LoggerModule } from './logger/logger.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    // CacheModule.register({ ttl: 5000 }),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     console.log(configService);
    //     console.log(configService.get('CACHE_URI'));
    //     return {
    //       stores: [
    //         new Keyv({
    //           store: new CacheableMemory({
    //             ttl: configService.get('CACHE_TTL'),
    //             lruSize: configService.get('CACHE_SIZE'),
    //           }),
    //         }),
    //         createKeyv(configService.get('CACHE_URI')),
    //       ],
    //     };
    //   },
    // }),
    UsersModule,
    ScheduleModule.forRoot(),
    TasksModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('QUEUE_HOST'),
          port: configService.get('QUEUE_PORT'),
          keyPrefix: configService.get('QUEUE_PREFIX'),
        },
      }),
    }),
    AudioModule,
    EventEmitterModule.forRoot(),
    OrdersModule,
    AuthModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
      // useFactory: (configService: ConfigService) => [
      //   {
      //     ttl: configService.get('THROTTLE_TTL'),
      //     limit: configService.get('THROTTLE_LIMIT'),
      //   },
      // ],
    }),
  ],
  controllers: [AppController, AppControllerV2],
  providers: [
    AppService,
    // { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {}
