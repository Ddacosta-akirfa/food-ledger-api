export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  photo?: string;
}

export interface UserCreateData extends CreateUserDTO {
  isActive: boolean;
}
