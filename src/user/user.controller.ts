import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SwaggerApi } from 'src/decorators/swagger-api.decorator';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
@SwaggerApi('User Profile and Follow')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Get User Profile **information, likes, tweets, retweets, following and followers**
   */
  @Get('profile')
  async getUserProfile(@Req() req: Request) {
    return await this.userService.findOne(req.user.id,);
  }

  /**
   * **Follow** exisiting User
   */
  @Post('follow/:userId')
  @ApiParam({ name: "userId", description: "UserId for the followee" })
  async followUser(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) 
    userId: number,
  ) {
    return this.userService.followUser(req.user.id, userId);
  }

  /**
   * **Unfollow** user which is followed earlier.
   */
  @Delete('unfollow/:userId')
  @ApiParam({ name: "userId", description: "UserId for the followee" })
  async unfollowUser(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.unFollowUser(req.user.id, userId);
  }
}
