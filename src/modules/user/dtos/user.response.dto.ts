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
