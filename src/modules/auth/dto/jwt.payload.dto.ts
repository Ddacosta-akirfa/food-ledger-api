export interface JwtPayload {
  /**
   * Subject (ID do usuário) — identifica o dono do token
   */
  id: string;

  /**
   * Email do usuário — usado para identificação e comunicação
   */
  email: string;

  /**
   * Nome opcional do usuário — pode não estar presente em todos os tokens
   */
  name?: string;

  /**
   * Issued At — timestamp (em segundos) indicando quando o token foi emitido
   */
  iat?: number;

  /**
   * Expiration Time — timestamp (em segundos) indicando quando o token expira
   */
  exp?: number;
}
