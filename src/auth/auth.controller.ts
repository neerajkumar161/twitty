import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleAuthDto } from './dtos/google-auth.dto';

@Controller('auth')
@ApiTags('User Login or Signup using Google Auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  /**
   * Google Auth API for **Login** and **Signup** using Google, use browser to get **Authentication token**
   */
  @Post('google')
  async googleAuth(@Body() body: GoogleAuthDto) {
    return await this.authService.googleAuth(body.credential);
  }
}
