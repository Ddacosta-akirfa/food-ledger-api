export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  photo?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface UserEntityDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  photo?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
