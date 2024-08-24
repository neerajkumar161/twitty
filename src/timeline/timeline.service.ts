import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Retweet } from 'src/tweet/entities/retweet.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Follow } from 'src/user/entities/follow.entity';
import { In, Repository } from 'typeorm';

@Injectable()
@UseGuards(JwtAuthGuard)
export class TimelineService {
  constructor(
    @InjectRepository(Tweet) private tweetRepo: Repository<Tweet>,
    @InjectRepository(Follow) private followRepo: Repository<Follow>,
    @InjectRepository(Retweet) private retweetRepo: Repository<Retweet>,
  ) {}

  async getUserTimeline(userId: number, page: number = 1, limit: number = 10) {
    // Get the list of followeee, that current user is following
    const followees = await this.followRepo.find({
      where: {
        follower: { id: userId },
      },
      relations: ['followee'],
    });

    const followeeIds = followees.map((followee) => followee?.followee?.id);
    const offset = (page - 1) * limit;

    // Fetch followee tweets
    const followeeTweets = await this.tweetRepo.find({
      where: { user: { id: In(followeeIds) } },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    const retweets = await this.retweetRepo.find({
      where: { user: { id: In(followeeIds) } },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['originalTweet'],
    });

    const tweetsAndRetweets = [...followeeTweets, ...retweets];
    tweetsAndRetweets.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    return tweetsAndRetweets.slice(offset, offset + limit);
  }
}
