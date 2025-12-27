import { IUserRepository } from "../../user/repository/IUserRepository.js";
import { AuthResponse } from "../interfaces/AuthResponse.js";
import { IAuthService } from "../interfaces/IAuthService.js";
import { JWTPayload } from "../interfaces/JWTPayload.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("Usuário ou senha inválidos");
    if (!user.isActive) throw new Error("Usuário não activado");

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new Error("Usuário ou senha inválidos");

    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = this.generateToken(payload);

    return {
      token,
      admin: {
        id: payload.id,
        email: payload.email,
        name: payload.name,
      },
    };
  }

  private generateToken(payload: JWTPayload): string {
    const secret = process.env.JWT_SECRET;
    const expiresIn = "1d";

    if (!secret) {
      throw new Error("JWT_SECRET não configurado");
    }

    return jwt.sign(payload, secret, { expiresIn });
  }
}
