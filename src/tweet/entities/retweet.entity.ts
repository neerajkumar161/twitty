import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity()
export class Retweet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.retweets)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Tweet, (tweet) => tweet.retweets)
  @JoinColumn({ name: 'tweetId' })
  originalTweet: Tweet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
