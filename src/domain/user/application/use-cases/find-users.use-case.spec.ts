import { Test } from "@nestjs/testing"
import { FindUsersUseCase } from "./find-users.use-case"
import { UserRepository } from "../repositories/user-repository"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { EnumUserRole } from "@prisma/client"
import { User } from "../../enterprise/entities/user.entity"

describe("FindUsersUseCase", () => {
  let findUsersUseCase: FindUsersUseCase
  let userRepository: UserRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindUsersUseCase,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findByRole: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile()

    findUsersUseCase = moduleRef.get<FindUsersUseCase>(FindUsersUseCase)
    userRepository = moduleRef.get<UserRepository>(UserRepository)
  })

  it("should find a user by id", async () => {
    const user = User.create({
      email: "test@example.com",
      password: "password123",
      role: EnumUserRole.VIEWER,
    })

    jest.spyOn(userRepository, "findById").mockResolvedValue(user)

    const result = await findUsersUseCase.execute({ id: "1" })

    expect(result.user).toBe(user)
    expect(userRepository.findById).toHaveBeenCalledWith("1")
  })

  it("should throw NotFoundException when user is not found by id", async () => {
    jest.spyOn(userRepository, "findById").mockResolvedValue(null)

    await expect(findUsersUseCase.execute({ id: "1" })).rejects.toThrow(NotFoundException)
  })

  it("should throw BadRequestException when id is not a string", async () => {
    await expect(findUsersUseCase.execute({ id: 123 as any })).rejects.toThrow(BadRequestException)
  })

  it("should find a user by email", async () => {
    const user = User.create({
      email: "test@example.com",
      password: "password123",
      role: EnumUserRole.VIEWER,
    })

    jest.spyOn(userRepository, "findByEmail").mockResolvedValue(user)

    const result = await findUsersUseCase.execute({ email: "test@example.com" })

    expect(result.user).toBe(user)
    expect(userRepository.findByEmail).toHaveBeenCalledWith("test@example.com")
  })

  it("should throw NotFoundException when user is not found by email", async () => {
    jest.spyOn(userRepository, "findByEmail").mockResolvedValue(null)

    await expect(findUsersUseCase.execute({ email: "test@example.com" })).rejects.toThrow(NotFoundException)
  })

  it("should throw BadRequestException when email is invalid", async () => {
    await expect(findUsersUseCase.execute({ email: "invalid-email" })).rejects.toThrow(BadRequestException)
  })

  it("should find users by role", async () => {
    const users = [
      User.create({
        email: "test1@example.com",
        password: "password123",
        role: EnumUserRole.VIEWER,
      }),
      User.create({
        email: "test2@example.com",
        password: "password123",
        role: EnumUserRole.VIEWER,
      }),
    ]

    jest.spyOn(userRepository, "findByRole").mockResolvedValue(users)

    const result = await findUsersUseCase.execute({ role: EnumUserRole.VIEWER })

    expect(result.users).toBe(users)
    expect(userRepository.findByRole).toHaveBeenCalledWith(EnumUserRole.VIEWER)
  })

  it("should throw BadRequestException when role is invalid", async () => {
    await expect(findUsersUseCase.execute({ role: "INVALID_ROLE" as any })).rejects.toThrow(BadRequestException)
  })

  it("should find all users when no filter is provided", async () => {
    const users = [
      User.create({
        email: "test1@example.com",
        password: "password123",
        role: EnumUserRole.VIEWER,
      }),
      User.create({
        email: "test2@example.com",
        password: "password123",
        role: EnumUserRole.ADMIN,
      }),
    ]

    jest.spyOn(userRepository, "findAll").mockResolvedValue(users)

    const result = await findUsersUseCase.execute({})

    expect(result.users).toBe(users)
    expect(userRepository.findAll).toHaveBeenCalled()
  })
})

