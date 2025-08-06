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

    async findAllProducts() {
        return this.prisma.product.findMany();
    }

    async findProductById(id: number){
        return this.prisma.product.findUnique({
            where: { id }
        });
    }

    async updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.prisma.product.update({
            where: { id },
            data
        });
    }



    async deleteproduct(id: number) {
        return this.prisma.product.delete({
            where: { id }
        });
    }











}
