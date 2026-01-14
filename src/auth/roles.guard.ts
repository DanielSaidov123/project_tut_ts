import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // 1️⃣ קבלת ה־roles שהוגדרו על ה־route
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true; // אם אין roles → כל אחד יכול להיכנס

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // 2️⃣ בדיקה אם קיים Authorization header
    if (!authHeader) throw new ForbiddenException('No token provided');

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new ForbiddenException('Invalid authorization header format');
    }

    const token = parts[1];
    let payload: any;

    // 3️⃣ בדיקת תקינות הטוקן
    try {
      payload = this.jwtService.verify(token);
      console.log('Payload from JWT:', payload); // ✅ כאן נראה מה יש בטוקן
    } catch (err) {
      console.error('JWT verification failed:', err.message);
      throw new ForbiddenException('Invalid or expired token');
    }

    // 4️⃣ בדיקה אם המשתמש רשאי לפי ה־role
    if (!requiredRoles.includes(payload.role)) {
      throw new ForbiddenException(
        `You do not have permission. Required: ${requiredRoles.join(', ')}, your role: ${payload.role}`,
      );
    }

    // 5️⃣ שמירת payload בבקשה כדי שנוכל להשתמש בו בהמשך
    request.user = payload;
    return true;
  }
}
