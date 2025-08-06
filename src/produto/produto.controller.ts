import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-produto.dto';
import { ProdutoService } from './produto.service';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { UpdateProductDto } from './dto/update-produto.dto';

@Controller('produto')
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService) {}

    @Post('create')

   @Post()
   async createProduct(@Body() data: CreateProductDto) {
       return this.produtoService.createproduct(data);
   }

   @Get()
   @ApiOperation({summary: 'lista todos os produtos'})
   async AllProducts() {
       return this.produtoService.findAllProducts();
   }

    @Get(':id')
    @ApiOperation({summary: 'encontrar um produto por id'})
    async findProductById(@Param('id') id: number) {
        return this.produtoService.findProductById(id);
    }



    @Put(':id')
    @ApiOperation({summary: 'atualizar um produto'})
    async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
        return this.produtoService.updateProduct(id, data);
    }


    @Delete(':id')
    @ApiOperation({summary: 'deletar um produto'})
    async deleteProduct(@Param('id') id: number) {
        return this.produtoService.deleteproduct(id);
    }
















}
