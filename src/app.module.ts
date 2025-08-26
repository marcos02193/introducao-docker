import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProdutoModule, PrismaModule, UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
