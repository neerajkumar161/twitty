import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Follow } from 'src/user/entities/follow.entity';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import { Retweet } from 'src/tweet/entities/retweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, Tweet, Retweet])],
  providers: [TimelineService],
  controllers: [TimelineController],
})
export class TimelineModule {}
