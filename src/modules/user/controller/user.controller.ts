import { Request, Response } from "express";
import { UserService } from "../service/user.service.js";
import { UserRepository } from "../repository/UserRepository.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../../generated/prisma/client.js";
import { EmailService } from "../../../shared/services/email.service.js";
import { ApiResponse } from "../../../shared/utils/ApiResponse.js";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const db = new PrismaClient({ adapter });
const userRepository = new UserRepository(db);
const emailService = new EmailService();
const userService = new UserService(userRepository, emailService);

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await userService.createUser(data);

    return ApiResponse.created(res, "Usuário criado com sucesso", user);
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
};

export const activateUser = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const user = await userService.activateUser(token);

    return ApiResponse.success(res, "Usuário activado com sucesso", user);
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
};
