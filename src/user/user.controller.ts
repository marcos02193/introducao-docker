import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}


    @Post()
    @ApiOperation({summary: 'Criar um novo usuário'})
    @ApiResponse({status: 201, description: 'Usuário criado com sucesso'})
    async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
        return this.userService.createUser(data);
    }

    @Get()
    @ApiOperation({summary: 'Encontrar todos os usuários'})
    @ApiResponse({status: 200, description: 'Usuários encontrados com sucesso'})
    async findAllUsers(): Promise<User[]> {
        return this.userService.findAllUsers();
    }
    @Get(':id')
    @ApiOperation({summary: 'Encontrar um usuário por ID'})
    @ApiResponse({status: 200, description: 'Usuário encontrado com sucesso'})
    async findUserById(@Param('id') id: number): Promise<User | null> {
        return this.userService.findUserById(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Atualizar um usuário por ID'})
    @ApiResponse({status: 200, description: 'Usuário atualizado com sucesso'})
    async updateUser(@Param('id') id: number, @Body() data: Prisma.UserUpdateInput): Promise<User> {
        return this.userService.updateUser(id, data);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deletar um usuário por ID'})
    @ApiResponse({status: 200, description: 'Usuário deletado com sucesso'})
    async deleteUser(@Param('id') id: number): Promise<User> {
        return this.userService.deleteUser(id);
    }

}
