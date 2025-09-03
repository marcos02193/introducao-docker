import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

     async registerUser(userData: RegisterDto) {
        const userExists = await this.prisma.user.findUnique({
            where: {email: userData.email}
        })

        if(userExists){
            throw new ConflictException("Email já está em uso!")
        }

        const hashedPassword = await bcrypt.hash(
            userData.password, 10)


        const newUser = await this.prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })
        
        return newUser;
    }

      async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Credenciais inválidas');

        if(!user.password) throw new UnauthorizedException(
            'Usuário não possui senha definida (Logar com o Google)'
        )
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Credenciais inválidas');

        return user;
    }

     async login(credentials: LoginDto) {
        const user = await this.validateUser(credentials.email, credentials.password);

        const payload = {
            sub: user.id,
            role: user.role,
            email: user.email,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }











    
}
