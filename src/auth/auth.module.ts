import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
    secret: 'jwt_secret',
    signOptions: { expiresIn: '1d' } // Token expiration time
  })],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
   exports: [AuthService],
})
export class AuthModule {}
