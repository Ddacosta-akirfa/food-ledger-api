import { UpdateUserDTO } from "../dtos/update.user.dto.js";
import { UserResponseDTO } from "../dtos/user.response.dto.js";
import { IUserRepository } from "./IUserRepository.js";
import { PrismaClient } from "../../../generated/prisma/client.js";
import { CreateUserDTO } from "../dtos/create.user.dto.js";

// const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

export class UserRepository implements IUserRepository {
  constructor(private db: PrismaClient) {}

  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const user = this.db.user.create({
      data: {
        ...data,
        isActive: false,
      },
    });

    return user;
  }

  async findById(id: string): Promise<UserResponseDTO | null> {
    const user = await this.db.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserResponseDTO | null> {
    const user = await this.db.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });

    return user;
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const updatedUser = await this.db.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data,
    });

    return updatedUser;
  }

  async activate(id: string): Promise<UserResponseDTO> {
    const activeUser = await this.db.user.update({
      where: { id },
      data: {
        isActive: true,
      },
    });

    return activeUser;
  }

  async delete(id: string): Promise<UserResponseDTO> {
    const userDeleted = this.db.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return userDeleted;
  }
}
