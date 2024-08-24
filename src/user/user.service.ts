import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Follow) private followRepo: Repository<Follow>,
  ) {}

  async findOrCreateUser(payload: Partial<User>) {
    const user = await this.userRepo.findOne({
      where: { email: payload.email },
    });
    if (!user) {
      const newUser = this.userRepo.create(payload);
      return this.userRepo.save(newUser);
    }
    Object.assign(user, payload);
    return this.userRepo.save(user);
  }

  findOne(userId: number) {
    return this.userRepo.findOne({
      where: { id: userId },
      select: ['tweets', 'likes'],
      relations: ['tweets', 'retweets', 'followings', 'followers'],
    });
  }

  async followUser(followerId: number, followeeId: number) {
    try {
      if (followeeId == followerId) {
        throw new BadRequestException('Users cannot follow themselves!');
      }

      const followee = await this.userRepo.findOne({
        where: { id: followeeId },
      });
      if (!followee) {
        throw new NotFoundException('User not found!');
      }

      const existingFollow = await this.followRepo.findOne({
        where: {
          follower: { id: followerId },
          followee: { id: followeeId },
        },
      });
      if (existingFollow) {
        throw new BadRequestException('Already following this user!');
      }

      const follow = this.followRepo.create({
        follower: { id: followerId },
        followee: { id: followeeId },
      });
      return this.followRepo.save(follow);
    } catch (error) {
      throw error;
    }
  }

  async unFollowUser(followerId: number, followeeId: number) {
    try {
      const existingFollow = await this.followRepo.findOne({
        where: {
          follower: { id: followerId },
          followee: { id: followeeId },
        },
      });
      if (!existingFollow) {
        throw new BadRequestException('Follow relationship not found!');
      }

      await this.followRepo.remove(existingFollow);
      return 'User Unfollowed!';
    } catch (error) {
      throw error;
    }
  }
}
