import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Retweet } from './entities/retweet.entity';
import { Tweet } from './entities/tweet.entity';
import { Like } from './entities/like.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, Like, Retweet, Tweet])],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
