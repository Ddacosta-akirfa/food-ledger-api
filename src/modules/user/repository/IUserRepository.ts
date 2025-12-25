import { promises } from "node:dns";
import { UpdateUserDTO } from "../dtos/update.user.dto.js";
import { UserEntityDTO, UserResponseDTO } from "../dtos/user.response.dto.js";
import { CreateUserDTO } from "../dtos/create.user.dto.js";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserResponseDTO>;

  findById(id: string): Promise<UserResponseDTO | null>;
  findByEmail(email: string): Promise<UserEntityDTO | null>;

  update(id: string, data: UpdateUserDTO): Promise<UserResponseDTO>;

  activate(id: string): Promise<UserResponseDTO>;

  delete(id: string): Promise<UserResponseDTO>;
}
