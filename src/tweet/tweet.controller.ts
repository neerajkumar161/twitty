import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SwaggerApi } from 'src/decorators/swagger-api.decorator';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { LikeTweetDto } from './dtos/like-tweet.dto';
import { TweetService } from './tweet.service';

@Controller('tweet')
@UseGuards(JwtAuthGuard)
@SwaggerApi('Tweet APIs')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  /**
   * Post a new **Tweet**.
   */
  @Post()
  createTweet(@Req() req: Request, @Body() body: CreateTweetDto) {
    return this.tweetService.createTweet(req.user.id, body.content);
  }

  /**
   * **Like** a tweet.
   */
  @Post('like')
  likeTweet(@Req() req: Request, @Body() body: LikeTweetDto) {
    return this.tweetService.likeTweet(req.user.id, body.tweetId);
  }

  /**
   * **Retweet** a tweet.
   */
  @Post('retweet')
  reTweet(@Req() req: Request, @Body() body: LikeTweetDto) {
    return this.tweetService.retweet(req.user.id, body.tweetId);
  }
}
