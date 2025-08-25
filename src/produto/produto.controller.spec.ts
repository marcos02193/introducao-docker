import { Test, TestingModule } from "@nestjs/testing"
import { ProdutoService } from "./produto.service"
import { ProdutoController } from "./produto.controller"

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


    it("deve listar todos os produtos", async () => {
         const produtos = [
            { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99 },
            { id: 2, name: 'Energy', description: 'Sabor limão', price: 8.99 },
            { id: 3, name: 'Gamer', description: 'Sabor uva', price: 10.99 },
            { id: 4, name: 'manteiga', description: 'Sabor novo', price: 12.99 },
            { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99 }
        ]

    mockUserService.findAllProducts.mockResolvedValue(produtos)

    expect(await controller.AllProducts()).toEqual(produtos)
    })

    it("deve encontrar um produto especifico", async () => {
        const produtos = [
            { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99 },
            { id: 2, name: 'Energy', description: 'Sabor limão', price: 8.99 },
            { id: 3, name: 'Gamer', description: 'Sabor uva', price: 10.99 },
            { id: 4, name: 'manteiga', description: 'Sabor novo', price: 12.99 },
            { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99 }
        ]

    mockUserService.findProductById.mockResolvedValue(produtos)

    expect(await controller.findProductById(produtos[0].id)).toEqual(produtos)
    })

    it("deve atualizar um produto", async () => {
     const produtos =   { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99 }

  const updateproduto = {...produtos, id: 5}
  mockUserService.updateProduct.mockResolvedValue(produtos)
  const result = await controller.updateProduct(5, produtos)
  expect(result).toEqual(updateproduto)
})

it("deve deletar um produto", async () => {
       const produtos = [
            { id: 1, name: 'Monster', description: 'Sabor morango', price: 9.99 },
            { id: 2, name: 'Energy', description: 'Sabor limão', price: 8.99 },
            { id: 3, name: 'Gamer', description: 'Sabor uva', price: 10.99 },
            { id: 4, name: 'manteiga', description: 'Sabor novo', price: 12.99 },
            { id: 5, name: 'biscoito', description: 'Sabor diferente', price: 15.99 }
        ]

  mockUserService.deleteproduct.mockResolvedValue(produtos)

  expect(await controller.deleteProduct(produtos[2].id)).toEqual(produtos)

})


})