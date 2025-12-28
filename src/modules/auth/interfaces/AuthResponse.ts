export interface AuthResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}
