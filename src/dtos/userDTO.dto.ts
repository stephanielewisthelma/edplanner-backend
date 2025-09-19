export interface CreateUserDTO {
  name?: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  name?: string | null;
  email: string;
  role: string;
  createdAt: Date;
}
