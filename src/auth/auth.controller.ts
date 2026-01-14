import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string; role: string },
  ) {
    // בדיקה פשוטה – כאן תוסיף בדיקה מול DB
    const user = { id: 1, username: body.username, role: body.role };
    return this.authService.generateToken(user);
  }
}
