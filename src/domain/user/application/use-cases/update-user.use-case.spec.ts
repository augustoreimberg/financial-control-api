import { Test } from "@nestjs/testing"
import { UpdateUserUseCase } from "./update-user.use-case"
import { UserRepository } from "../repositories/user-repository"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { EnumUserRole } from "@prisma/client"
import { User } from "../../enterprise/entities/user.entity"

describe("UpdateUserUseCase", () => {
  let updateUserUseCase: UpdateUserUseCase
  let userRepository: UserRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    updateUserUseCase = moduleRef.get<UpdateUserUseCase>(UpdateUserUseCase)
    userRepository = moduleRef.get<UserRepository>(UserRepository)
  })

  it("should update a user with valid data", async () => {
    const user = User.create({
      email: "old@example.com",
      password: "oldpassword",
      role: EnumUserRole.VIEWER,
    })

    jest.spyOn(userRepository, "findById").mockResolvedValue(user)
    jest.spyOn(userRepository, "update").mockResolvedValue(undefined)

    const updateParams = {
      id: "1",
      email: "new@example.com",
      password: "newpassword",
      role: EnumUserRole.ADMIN,
    }

    await updateUserUseCase.execute(updateParams)

    expect(userRepository.findById).toHaveBeenCalledWith("1")
    expect(userRepository.update).toHaveBeenCalledWith("1", {
      email: "new@example.com",
      password: "newpassword",
      role: EnumUserRole.ADMIN,
    })
  })

  it("should throw NotFoundException when user is not found", async () => {
    jest.spyOn(userRepository, "findById").mockResolvedValue(null)

    await expect(
      updateUserUseCase.execute({
        id: "1",
        email: "new@example.com",
      }),
    ).rejects.toThrow(NotFoundException)
  })

  it("should throw BadRequestException when id is not provided", async () => {
    await expect(
      updateUserUseCase.execute({
        id: "",
        email: "new@example.com",
      }),
    ).rejects.toThrow(BadRequestException)
  })

  it("should throw BadRequestException when email is invalid", async () => {
    const user = User.create({
      email: "old@example.com",
      password: "oldpassword",
      role: EnumUserRole.VIEWER,
    })

    jest.spyOn(userRepository, "findById").mockResolvedValue(user)

    await expect(
      updateUserUseCase.execute({
        id: "1",
        email: "invalid-email",
      }),
    ).rejects.toThrow(BadRequestException)
  })

  it("should throw BadRequestException when password is not a string", async () => {
    const user = User.create({
      email: "old@example.com",
      password: "oldpassword",
      role: EnumUserRole.VIEWER,
    })

    jest.spyOn(userRepository, "findById").mockResolvedValue(user)

    await expect(
      updateUserUseCase.execute({
        id: "1",
        password: 123 as any,
      }),
    ).rejects.toThrow(BadRequestException)
  })

  it("should throw BadRequestException when role is invalid", async () => {

    const user = User.create({
      email: "old@example.com",
      password: "oldpassword",
      role: EnumUserRole.VIEWER,
    })

    jest.spyOn(userRepository, "findById").mockResolvedValue(user)

    await expect(
      updateUserUseCase.execute({
        id: "1",
        role: "INVALID_ROLE" as any,
      }),
    ).rejects.toThrow(BadRequestException)
  })

  it("should only update provided fields", async () => {
    const user = User.create({
      email: "old@example.com",
      password: "oldpassword",
      role: EnumUserRole.VIEWER,
    })

    jest.spyOn(userRepository, "findById").mockResolvedValue(user)
    jest.spyOn(userRepository, "update").mockResolvedValue(undefined)

    await updateUserUseCase.execute({
      id: "1",
      email: "new@example.com",
    })

    expect(userRepository.update).toHaveBeenCalledWith("1", {
      email: "new@example.com",
    })
  })
})

