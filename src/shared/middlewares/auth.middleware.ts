import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { JwtPayload } from "../../modules/auth/dto/jwt.payload.dto.js";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return ApiResponse.error(res, "Token de autenticação ausente", 401);

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET!;
    const payload = jwt.verify(token!, secret) as JwtPayload;

    req.user = payload;

    next();
  } catch (error) {
    return ApiResponse.error(res, "Token inválido ou expirado", 401);
  }
}
