import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { Retweet } from './entities/retweet.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet) private tweetRepo: Repository<Tweet>,
    @InjectRepository(Like) private likeRepo: Repository<Like>,
    @InjectRepository(Retweet) private retweetRepo: Repository<Retweet>,
    private userService: UserService,
  ) {}

  async createTweet(userId: number, content: string) {
    const user = await this.userService.findOne(userId);
    const tweet = this.tweetRepo.create({ user: user, content });
    return this.tweetRepo.save(tweet);
  }

  async likeTweet(userId: number, tweetId: number) {
    // Assuming, we will get only not likes tweet id from client side
    const tweet = await this.tweetRepo.findOne({ where: { id: tweetId } });
    if (!tweet) {
      throw new NotFoundException('Tweet not found!');
    }

    const like = this.likeRepo.create({
      user: { id: userId },
      tweet: { id: tweetId },
    });

    await this.likeRepo.save(like);
    return 'Tweet Liked';
  }

  async retweet(userId: number, tweetId: number) {
    const tweet = await this.tweetRepo.findOne({ where: { id: tweetId } });
    if (!tweet) {
      throw new NotFoundException('Tweet not found!');
    }

    // Check if tweet is already tweeted?
    const existedRetweet = await this.retweetRepo.findOne({
      where: {
        user: { id: userId },
        originalTweet: { id: tweetId },
      },
    });

    if (existedRetweet) {
      throw new BadRequestException('This tweet already retweeted by the user');
    }

    const retweet = this.retweetRepo.create({
      user: { id: userId },
      originalTweet: { id: tweetId },
    });

    return this.retweetRepo.save(retweet);
  }
}
