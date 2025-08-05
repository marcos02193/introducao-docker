import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutoService {

    constructor(private prisma: PrismaService){}


    async createproduct(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({
            data
        });
    }

    async findAll() {
        return this.prisma.product.findMany();
    }






}
