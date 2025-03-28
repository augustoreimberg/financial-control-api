import { Test } from "@nestjs/testing"
import { CreateUserUseCase } from "./create-user.use-case"
import { UserRepository } from "../repositories/user-repository"
import { BadRequestException } from "@nestjs/common"
import { EnumUserRole } from "@prisma/client"
import { User } from "../../enterprise/entities/user.entity"

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase
  let userRepository: UserRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile()

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase)
    userRepository = moduleRef.get<UserRepository>(UserRepository)
  })

  it("should create a user with valid data", async () => {
    const createSpy = jest.spyOn(userRepository, "create")
    const createUserParams = {
      email: "test@example.com",
      password: "password123",
      role: EnumUserRole.VIEWER,
    }

    const result = await createUserUseCase.execute(createUserParams)

    expect(result.user).toBeDefined()
    expect(result.user.email).toBe(createUserParams.email)
    expect(result.user.role).toBe(createUserParams.role)
    expect(createSpy).toHaveBeenCalledWith(expect.any(User))
  })

  it("should create a user with default role when role is not provided", async () => {
    const createSpy = jest.spyOn(userRepository, "create")
    const createUserParams = {
      email: "test@example.com",
      password: "password123",
    }

    const result = await createUserUseCase.execute(createUserParams)

    expect(result.user).toBeDefined()
    expect(result.user.role).toBe(EnumUserRole.VIEWER)
    expect(createSpy).toHaveBeenCalledWith(expect.any(User))
  })

  it("should throw BadRequestException when email is invalid", async () => {
    const createUserParams = {
      email: "invalid-email",
      password: "password123",
    }

    await expect(createUserUseCase.execute(createUserParams)).rejects.toThrow(BadRequestException)
  })

  it("should throw BadRequestException when email is missing", async () => {
    const createUserParams = {
      email: "",
      password: "password123",
    }

    await expect(createUserUseCase.execute(createUserParams)).rejects.toThrow(BadRequestException)
  })

  it("should throw BadRequestException when password is not a string", async () => {
    const createUserParams = {
      email: "test@example.com",
      password: 123 as any,
    }

    await expect(createUserUseCase.execute(createUserParams)).rejects.toThrow(BadRequestException)
  })

  it("should throw BadRequestException when role is invalid", async () => {
    const createUserParams = {
      email: "test@example.com",
      password: "password123",
      role: "INVALID_ROLE" as any,
    }

    await expect(createUserUseCase.execute(createUserParams)).rejects.toThrow(BadRequestException)
  })
})

