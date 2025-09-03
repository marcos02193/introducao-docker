import { Test, TestingModule } from "@nestjs/testing"
import { ProdutoService } from "./produto.service"
import { PrismaService } from "../prisma/prisma.service"
import { Product } from "@prisma/client"

const mockPrisma = {
    product: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

describe("ProdutoService", () => {
    let produtoService: ProdutoService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProdutoService,
                { provide: PrismaService, useValue: mockPrisma },
            ]
        }).compile()
        produtoService = module.get<ProdutoService>(ProdutoService)
    })

    // 01.
    it("Deve criar um produto", async () => {
        const produtoDto = { name: 'Monster', description: 'Sabor morango', price: 9.99 }
        mockPrisma.product.create.mockResolvedValue(produtoDto)

        const result = await produtoService.createproduct(produtoDto as any)
        expect(result).toEqual(produtoDto)
        expect(mockPrisma.product.create).toHaveBeenCalledWith({ data: produtoDto })
    })

    // 02.
    it("deve listar todos os produtos", async () => {
        const produtos: Product[] = [
            { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, name: 'Energy', description: 'Sabor limão', price: 8.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, name: 'Gamer', description: 'Sabor uva', price: 10.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, name: 'manteiga', description: 'Sabor novo', price: 12.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99, createdAt: new Date(), updatedAt: new Date() }
        ]
        mockPrisma.product.findMany.mockResolvedValue(produtos)

        const result = await produtoService.findAllProducts()
        expect(result).toEqual(produtos)
        expect(mockPrisma.product.findMany).toHaveBeenCalled()
    })

    // 03.
    it("Deve encontrar produto por ID", async () =>{
         const produtos: Product[] = [
            { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, name: 'Energy', description: 'Sabor limão', price: 8.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, name: 'Gamer', description: 'Sabor uva', price: 10.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, name: 'manteiga', description: 'Sabor novo', price: 12.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99, createdAt: new Date(), updatedAt: new Date() }
        ]
        mockPrisma.product.findUnique.mockResolvedValue(produtos)

        const result = await produtoService.findProductById(3)
        expect(result).toEqual(produtos)
        expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({where: {id: 3}})
    })

    // 04.
    it("Deve atualizar um produto", async () => {
          const produtos = [
            { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, name: 'Energy', description: 'Sabor limão', price: 8.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, name: 'Gamer', description: 'Sabor uva', price: 10.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, name: 'manteiga', description: 'Sabor novo', price: 12.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99, createdAt: new Date(), updatedAt: new Date() }
        ]
        mockPrisma.product.findUnique.mockResolvedValue(produtos)
        mockPrisma.product.update.mockResolvedValue(produtos)

        const result = await produtoService.updateProduct(2, {name: 'Gamer', description: 'Sabor uva', price: 10.99 }as any )
        expect(result).toEqual(produtos)
        expect(mockPrisma.product.update).toHaveBeenCalledWith({
            where: {id: 2},
            data: {
                name: 'Gamer', 
                description: 'Sabor uva', 
                price: 10.99}
        })
    })

    // 05.
    it("Deve deletar um produto", async () => {
        const produtos: Product = { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99, createdAt: new Date(), updatedAt: new Date() }

        mockPrisma.product.delete.mockResolvedValue(produtos)

        const result = await produtoService.deleteproduct(produtos.id)
        expect(result).toEqual(produtos)
        expect(mockPrisma.product.delete).toHaveBeenCalledWith({
            where: {id: 1}
        })

    })























})