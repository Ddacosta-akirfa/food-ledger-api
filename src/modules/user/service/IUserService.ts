import { CreateUserDTO } from "../dtos/create.user.dto.js";
import { UserResponseDTO } from "../dtos/user.response.dto.js";

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<UserResponseDTO>;
  activateUser(token: string): Promise<void>;
}
