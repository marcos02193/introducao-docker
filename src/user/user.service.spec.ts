import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./user.service"
import { PrismaService } from "../prisma/prisma.service"
import {NotFoundException} from "@nestjs/common"


const mockPrisma = {
    user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

describe("UsersService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("deve listar todos os usuários", async () => {
    const users = [
      { id: 1, name: "Jonas", email: "jonas@example.com", password: "123" },
      { id: 2, name: "Maria", email: "maria@example.com", password: "456" },
      { id: 3, name: "Jose", email: "jose@example.com", password: "789" },
    ];
    mockPrisma.user.findMany.mockResolvedValue(users);

    const result = await service.findAllUsers();
    expect(result).toEqual(users);
  });

it("Mostrar usuario por ID", async () =>{
   const users = [
      { id: 1, name: "Jonas", email: "jonas@example.com", password: "123" },
      { id: 2, name: "Maria", email: "maria@example.com", password: "456" },
      { id: 3, name: "Jose", email: "jose@example.com", password: "789" },
    ];
    mockPrisma.user.findUnique.mockResolvedValue(users[0])

    const result = await service.findUserById(1)
    expect(result).toEqual(users[0])
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({where: {id: 1}});
    })


    
    // 04
  
    it("deve atualizar o usuario", async () => {
       const user = { id: 2, name: "Maria", email: "maria@example.com", password: "456" }
    mockPrisma.user.findUnique.mockResolvedValue(user)
    mockPrisma.user.update.mockResolvedValue(user)

    const result = await service.updateUser(2, {name: "Maria", email: "maria@example.com", password: "456" }as any)
    expect(result).toEqual(user)
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: {id: 2},
      data: {
        name: "Maria",
        email: "maria@example.com",
        password: "456" }
    });
  })

 it("Deve deletar um usuario", async () => {
      const user = { id: 2, name: "Maria", email: "maria@example.com", password: "456" }

      mockPrisma.user.findUnique.mockResolvedValue(user)
      mockPrisma.user.delete.mockResolvedValue(user)

      const result = await service.deleteUser(user.id)
      expect(result).toEqual(user)
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: {id: 2}
    });
    })
})