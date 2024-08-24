import { IsInt } from 'class-validator';

export class LikeTweetDto {
  @IsInt()
  tweetId: number;
}