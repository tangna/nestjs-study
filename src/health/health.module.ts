import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { TerminusLogger } from './terminus-logger.service';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: TerminusLogger,
      gracefulShutdownTimeoutMs: 1000,
    }),
    HttpModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
