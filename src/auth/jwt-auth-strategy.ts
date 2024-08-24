import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TCurrentUser } from './types/current-user';

export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SCRET_KEY,
    });
  }

  async validate(payload: TCurrentUser) {
    return { id: payload.id, email: payload.email, googleId: payload.googleId };
  }
}
