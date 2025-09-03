import { Test, TestingModule } from "@nestjs/testing"
import { ProdutoService } from "./produto.service"
import { ProdutoController } from "./produto.controller"
import { Product } from "@prisma/client"
import { CreateProductDto } from "./dto/create-produto.dto"
import { UpdateProductDto } from "./dto/update-produto.dto"

const mockUserService = {
    createproduct: jest.fn(),
    findAllProducts: jest.fn(),
    findProductById: jest.fn(),
    updateProduct: jest.fn(),
    deleteproduct: jest.fn()
}
describe("User Controller Testes", () => {
    let controller: ProdutoController

    beforeEach(async () => {
        const module: TestingModule  = await Test.createTestingModule({
            controllers: [ProdutoController],
            providers: [
                { provide: ProdutoService, useValue: mockUserService }
            ]
        }).compile()

        controller = module.get<ProdutoController>(ProdutoController)
    })


    //01
    it('deve criar um produto', async () => {
  const produtoDto = { name: 'Monster', description: 'Sabor morango', price: 9.99 };
  const now = new Date();

  const expectedResult = {
    id: 1,
    createdAt: now,
    updatedAt: now,
    ...produtoDto,
  };

  mockUserService.createproduct.mockResolvedValue(expectedResult);

  const result = await controller.createProduct(produtoDto as any);

  expect(result).toEqual(expectedResult);
  expect(mockUserService.createproduct).toHaveBeenCalledWith(produtoDto);
});

    // erro de milliseconds
    //  it("deve criar um produto", async () => {
    //         const produtoDto: CreateProductDto =
    //             { name: 'Monster', description: 'Sabor morango', price: 9.99 }

    //         mockUserService.createproduct.mockResolvedValue({ id: 1, createdAt: new Date(), updatedAt: new Date(), ...produtoDto })
    //         const result = await controller.createProduct(produtoDto as any)
    //         expect(result).toEqual({ id: 1, createdAt: new Date(), updatedAt: new Date(), ...produtoDto })
    //         expect(mockUserService.createproduct).toHaveBeenCalledWith(produtoDto)
    //     })

    //02
    it("deve listar todos os produtos", async () => {
         const produtos: Product[] = [
            { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99, createdAt: new Date(), updatedAt: new Date()  },
            { id: 2, name: 'Energy', description: 'Sabor limão', price: 8.99, createdAt: new Date(), updatedAt: new Date()  },
            { id: 3, name: 'Gamer', description: 'Sabor uva', price: 10.99, createdAt: new Date(), updatedAt: new Date()  },
            { id: 4, name: 'manteiga', description: 'Sabor novo', price: 12.99, createdAt: new Date(), updatedAt: new Date()  },
            { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99, createdAt: new Date(), updatedAt: new Date()  }
        ]

    mockUserService.findAllProducts.mockResolvedValue(produtos)

    expect(await controller.AllProducts()).toEqual(produtos)
    })
    //03
    it("deve encontrar um produto especifico", async () => {
        const produtos: Product[] = [
            { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, name: 'Energy', description: 'Sabor limão', price: 8.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, name: 'Gamer', description: 'Sabor uva', price: 10.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, name: 'manteiga', description: 'Sabor novo', price: 12.99, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99, createdAt: new Date(), updatedAt: new Date() }
        ]

    mockUserService.findProductById.mockResolvedValue(produtos)

    expect(await controller.findProductById(produtos[0].id)).toEqual(produtos)
    })
    //04
    it("deve atualizar um produto", async () => {
     const produtos: UpdateProductDto =   {name: 'biscoito', description: 'Sabor diferente', price: 15.99 }

  const updateproduto = {id: 1 , createdAt: new Date(), updatedAt: new Date(), ...produtos}
  mockUserService.updateProduct.mockResolvedValue(updateproduto)
  const result = await controller.updateProduct(updateproduto.id, produtos)
  expect(result).toEqual(updateproduto)
})
    //05
    it("deve deletar um produto", async () => {
       const produtos: Product[] = [
            { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99, createdAt: new Date(), updatedAt: new Date()  },
            { id: 2, name: 'Energy', description: 'Sabor limão', price: 8.99, createdAt: new Date(), updatedAt: new Date()  },
            { id: 3, name: 'Gamer', description: 'Sabor uva', price: 10.99, createdAt: new Date(), updatedAt: new Date()  },
            { id: 4, name: 'manteiga', description: 'Sabor novo', price: 12.99, createdAt: new Date(), updatedAt: new Date()  },
            { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99, createdAt: new Date(), updatedAt: new Date()  }
        ]

  mockUserService.deleteproduct.mockResolvedValue(produtos)

  expect(await controller.deleteProduct(produtos[2].id)).toEqual(produtos)

})


})