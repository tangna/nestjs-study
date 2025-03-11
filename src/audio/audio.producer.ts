import { Controller, Injectable, Post } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
@Controller('audio')
export class AudioProducer {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  @Post('transcode')
  async transcode() {
    await this.audioQueue.add('transcode', {
      foo: 'bar',
    });
  }
}
