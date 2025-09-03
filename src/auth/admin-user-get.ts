import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminOrUserGetGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const method = request.method;

    if (!user) return false;

    // ADMIN pode tudo
    if (user.role === 'ADMIN') return true;

    // USER só pode GET
    if (user.role === 'USER' && method === 'GET') return true;

    return false;
  }
}