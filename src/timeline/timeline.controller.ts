import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SwaggerApi } from '../decorators/swagger-api.decorator';
import { SwaggerApiUnion } from '../decorators/swagger-union.decorator';
import { Retweet } from '../tweet/entities/retweet.entity';
import { Tweet } from '../tweet/entities/tweet.entity';
import { GetUserTimelineDto } from './dtos/get-user-timelime.dto';
import { TimelineService } from './timeline.service';

@Controller('timeline')
@UseGuards(JwtAuthGuard)
@SwaggerApi('User Timeline')
export class TimelineController {
  constructor(private timelineService: TimelineService) {}

  /**
   * Get the Logged in User **Timeline**. Shows followed User **Tweets** and **Retweets**.
   */
  @Get()
  @SwaggerApiUnion(
    'Response containing either a Tweet or Retweet',
    Tweet,
    Retweet,
  )
  getUserTimeline(@Req() req: Request, @Query() query: GetUserTimelineDto) {
    return this.timelineService.getUserTimeline(
      req.user.id,
      query.page,
      query.limit,
    );
  }
}
