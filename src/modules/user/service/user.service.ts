import { EmailService } from "../../../shared/services/email.service.js";
import { CreateUserDTO } from "../dtos/create.user.dto.js";
import { UserResponseDTO } from "../dtos/user.response.dto.js";
import { IUserRepository } from "../repository/IUserRepository.js";
import { IUserService } from "./IUserService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,
    private emailService: EmailService
  ) {}

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const activationToken = this.generateActivationToken(user.id, user.email);
    const activationLink = `http://localhost:8888/api/v1/activate?token=${activationToken}`;

    const emailHtml = this.emailService.emailHtml(user.name, activationLink);

    await this.emailService.sendMail({
      from: '"FoodLedger" <no-reply@foodledger.com>',
      to: user.email,
      subject: "Active sua conta FoodLedger",
      html: emailHtml,
    });
    // return this.toUserResponseDTO(user);
    return user;
  }

  async activateUser(token: string): Promise<void> {
    try {
      const secret = process.env.JWT_ACTIVATION_SECRET!;

      console.log("TOKEN:", token);
      console.log("SECRET:", secret);
      if (typeof token !== "string") {
        throw new Error("Token inválido");
      }

      const payload = jwt.verify(token, secret) as {
        sub: string;
        email: string;
        type: string;
      };

      if (payload.type !== "activation")
        throw new Error("Token inválido para activação");

      const user = await this.userRepository.findById(payload.sub);

      if (!user) throw new Error("Usuário não encontrado");

      if (user.isActive) throw new Error("Usuário já está activo");

      if (user.deletedAt) throw new Error("Usuário está deletado");

      await this.userRepository.update(payload.sub, { isActive: true });
    } catch (error) {
      throw new Error("Token de activação inválido ou expirado");
    }
  }

  private generateActivationToken(userId: string, email: string): string {
    const secret = process.env.JWT_ACTIVATION_SECRET!;

    return jwt.sign({ sub: userId, email, type: "activation" }, secret, {
      expiresIn: "24h",
    });
  }

  private toUserResponseDTO(user: any): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo ?? null,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ?? null,
    };
  }
}
