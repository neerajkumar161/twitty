import { Logger } from '@nestjs/common';
import { Like } from 'src/tweet/entities/like.entity';
import { Retweet } from 'src/tweet/entities/retweet.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Follow } from './follow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  googleId: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Retweet, (retweet) => retweet.user)
  retweets: Retweet[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followee)
  followers: Follow[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterInsert()
  logInsert() {
    Logger.log(`Inserted with User Id: ${this.id}`);
  }
}
