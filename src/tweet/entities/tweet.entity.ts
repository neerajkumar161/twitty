import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from './like.entity';
import { Retweet } from './retweet.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tweets)
  @JoinColumn({ name: 'userId'})
  user: User;

  @OneToMany(() => Like, (likes) => likes.tweet, { eager: false , lazy: true })
  likes: Like[];

  @OneToMany(() => Retweet, (retweet) => retweet.originalTweet, { eager: false, lazy: true })
  retweets: Retweet[];

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
