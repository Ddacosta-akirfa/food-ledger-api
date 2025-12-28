import { AuthResponse } from "./AuthResponse.js";

export interface IAuthService {
  /**
   * Faz login do usuário com email e senha
   * Retorna um objecto com o token JWT
   * @param email string
   * @param password string
   */
  login(email: string, password: string): Promise<AuthResponse>;
}
