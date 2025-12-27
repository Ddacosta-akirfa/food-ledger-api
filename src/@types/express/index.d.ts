import { JwtPayload } from "../../modules/auth/dto/jwt.payload.dto.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
