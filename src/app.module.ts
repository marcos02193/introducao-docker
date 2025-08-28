import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProdutoModule, PrismaModule, UserModule, AuthModule],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class AppModule {}
