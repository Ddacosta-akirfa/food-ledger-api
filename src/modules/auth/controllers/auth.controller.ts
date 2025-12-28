// src/modules/auth/controllers/AuthController.ts
import { Request, Response } from "express";
import { AuthService } from "../service/auth.service.js";
import { UserRepository } from "../../user/repository/UserRepository.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../../generated/prisma/client.js";
import { ApiResponse } from "../../../shared/utils/ApiResponse.js";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const db = new PrismaClient({ adapter });
const userRepository = new UserRepository(db);
const authService = new AuthService(userRepository);

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const authResponse = await authService.login(email, password);

    return ApiResponse.success(
      res,
      "Login realizado com sucesso",
      authResponse
    );
  } catch (error: any) {
    return ApiResponse.error(res, error.message, 401);
  }
};
