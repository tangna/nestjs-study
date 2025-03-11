import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AudioProducer } from './audio.producer';
import { AudioConsumer } from './audio.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
    }),
  ],
  controllers: [AudioProducer],
  providers: [AudioConsumer],
})
export class AudioModule {}
