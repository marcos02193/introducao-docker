import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './create-produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService) {}

    @Post('create')

   @Post()
   async createProduct(@Body() data: CreateProductDto) {
       return this.produtoService.createproduct(data);
   }


}
