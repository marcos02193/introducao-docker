import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"

const mockUserService = {
    findAllUsers: jest.fn(),
    findUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
}

describe("User Controller Testes", () => {
    let controller: UserController

    beforeEach(async () => {
        const module: TestingModule  = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                { provide: UserService, useValue: mockUserService }
            ]
        }).compile()

        controller = module.get<UserController>(UserController)
    })

    // 01
    it("deve listar todos os usuarios", async () => {
        const users = [
      { id: 1, name: "Jonas", email: "jonas@example.com", password: "123" },
      { id: 2, name: "Maria", email: "maria@example.com", password: "456" },
      { id: 3, name: "Jose", email: "jose@example.com", password: "789" },
    ];

    mockUserService.findAllUsers.mockResolvedValue(users)

    expect(await controller.findAllUsers()).toEqual(users)

    })

    // 02
    it("deve encontrar um usuario especifico", async () => {
        const users = [
      { id: 1, name: "Jonas", email: "jonas@example.com", password: "123" },
      { id: 2, name: "Maria", email: "maria@example.com", password: "456" },
      { id: 3, name: "Jose", email: "jose@example.com", password: "789" },
    ];

    mockUserService.findUserById.mockResolvedValue(users[0])

    expect(await controller.findUserById(users[0].id)).toEqual(users[0])
    })

    // 03
it("deve atualizar um usuario", async () => {
     const users = { id: 2, name: "Jonas", email: "jonas@example.com", password: "123" }

  const updateusers = {...users, id: 2}
  mockUserService.updateUser.mockResolvedValue(users)
  const result = await controller.updateUser(2, users)
  expect(result).toEqual(updateusers)
})

// 04
it("deve deletar um usuario", async () => {
     const users = [
    { id: 1, name: "Jonas", email: "jonas@example.com", password: "123" },
    { id: 2, name: "Maria", email: "maria@example.com", password: "456" },
    { id: 3, name: "Jose", email: "jose@example.com", password: "789" },
  ];

  mockUserService.deleteUser.mockResolvedValue(users[2])

  expect(await controller.deleteUser(users[2].id)).toEqual(users[2])

})


})