import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-produto.dto';
import { ProdutoService } from './produto.service';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { UpdateProductDto } from './dto/update-produto.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('produto')
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService) {}


   @Post()
   @ApiOperation({summary: 'Criar um produto'})
   @ApiResponse({ status: 201, description: 'Produto criado com sucesso'})
   async createProduct(@Body() data: CreateProductDto) {
       return this.produtoService.createproduct(data);
   }

   @Get()
   @ApiOperation({summary: 'Lista todos os produtos'})
   @ApiResponse({status: 200, description: 'Produtos encontrados com sucesso'})
   async AllProducts() {
       return this.produtoService.findAllProducts();
   }

    @Get(':id')
    @ApiOperation({summary: 'Encontrar um produto por id'})
    @ApiResponse({status: 200, description: 'Produto encontrado com sucesso'})
    async findProductById(@Param('id') id: number) {
        return this.produtoService.findProductById(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'atualizar um produto'})
    @ApiResponse({status: 200, description: 'produto atualizado com sucesso'})
    async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
        return this.produtoService.updateProduct(id, data);
    }

    @Delete(':id')
    @ApiOperation({summary: 'deletar um produto'})
    @ApiResponse({status: 200,  description: 'produto deletado com sucesso'})
    async deleteProduct(@Param('id') id: number) {
        return this.produtoService.deleteproduct(id);
    }
















}
