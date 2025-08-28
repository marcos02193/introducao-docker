import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-produto.dto';
import { ProdutoService } from './produto.service';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { UpdateProductDto } from './dto/update-produto.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { UserGuard } from 'src/auth/user.guard';
import { AdminOrUserGetGuard } from 'src/auth/admin-user-get';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('produto')
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService) {}

   @UseGuards(AdminGuard)
   @Post()
   @ApiOperation({summary: 'Criar um produto'})
   @ApiResponse({ status: 201, description: 'Produto criado com sucesso'})
   async createProduct(@Body() data: CreateProductDto) {
       return this.produtoService.createproduct(data);
   }
   @UseGuards(AdminOrUserGetGuard)
   @Get()
   @ApiOperation({summary: 'Lista todos os produtos'})
   @ApiResponse({status: 200, description: 'Produtos encontrados com sucesso'})
   async AllProducts() {
       return this.produtoService.findAllProducts();
   }
   @UseGuards(AdminOrUserGetGuard)
    @Get(':id')
    @ApiOperation({summary: 'Encontrar um produto por id'})
    @ApiResponse({status: 200, description: 'Produto encontrado com sucesso'})
    async findProductById(@Param('id') id: number) {
        return this.produtoService.findProductById(id);
    }
    @UseGuards(AdminGuard)
    @Put(':id')
    @ApiOperation({summary: 'atualizar um produto'})
    @ApiResponse({status: 200, description: 'produto atualizado com sucesso'})
    async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
        return this.produtoService.updateProduct(id, data);
    }
    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiOperation({summary: 'deletar um produto'})
    @ApiResponse({status: 200,  description: 'produto deletado com sucesso'})
    async deleteProduct(@Param('id') id: number) {
        return this.produtoService.deleteproduct(id);
    }
















}
