import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TCurrentUser } from './types/current-user';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async googleAuth(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userPayload: Partial<User> = {
      email: payload.email,
      firstName: payload?.given_name,
      lastName: payload?.family_name,
      googleId: payload.sub,
      imageUrl: payload.picture,
    };
    
    const result = await this.userService.findOrCreateUser(userPayload);
    
    return this.generateJWTToken({
      id: result.id,
      email: result.email,
      googleId: result.googleId,
    });
  }

  private async generateJWTToken(payload: TCurrentUser) {
    return {
      access_token: this.jwtService.sign({
        id: payload.id,
        email: payload.email,
        googleId: payload.googleId,
      }),
    };
  }
}
