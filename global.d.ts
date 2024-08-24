import { TCurrentUser } from 'src/auth/types/current-user';

declare module 'express' {
  export interface Request {
    user?: TCurrentUser;
  }
}
