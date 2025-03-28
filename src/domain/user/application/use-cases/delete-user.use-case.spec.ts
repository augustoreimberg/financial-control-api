import { Test } from "@nestjs/testing"
import { DeleteUserUseCase } from "./delete-user.use-case"
import { UserRepository } from "../repositories/user-repository"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { EnumUserRole } from "@prisma/client"
import { User } from "../../enterprise/entities/user.entity"

describe("DeleteUserUseCase", () => {
  let deleteUserUseCase: DeleteUserUseCase
  let userRepository: UserRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    deleteUserUseCase = moduleRef.get<DeleteUserUseCase>(DeleteUserUseCase)
    userRepository = moduleRef.get<UserRepository>(UserRepository)
  })

  it("should delete a user with valid id", async () => {
    const user = User.create({
      email: "test@example.com",
      password: "password123",
      role: EnumUserRole.VIEWER,
    })

    jest.spyOn(userRepository, "findById").mockResolvedValue(user)
    jest.spyOn(userRepository, "delete").mockResolvedValue(undefined)

    const result = await deleteUserUseCase.execute({ id: "1" })

    expect(result.success).toBe(true)
    expect(userRepository.findById).toHaveBeenCalledWith("1")
    expect(userRepository.delete).toHaveBeenCalledWith("1")
  })

  it("should throw NotFoundException when user is not found", async () => {
    jest.spyOn(userRepository, "findById").mockResolvedValue(null)

    await expect(deleteUserUseCase.execute({ id: "1" })).rejects.toThrow(NotFoundException)
  })

  it("should throw BadRequestException when id is not provided", async () => {
    await expect(deleteUserUseCase.execute({ id: "" })).rejects.toThrow(BadRequestException)
  })

  it("should throw BadRequestException when id is not a string", async () => {
    await expect(deleteUserUseCase.execute({ id: 123 as any })).rejects.toThrow(BadRequestException)
  })
})

