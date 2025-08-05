import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './create-produto.dto';
import { ProdutoService } from './produto.service';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

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

}
