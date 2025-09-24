
export interface CreateUserDTO {
  name?: string; // optional from frontend -> will be stored as null if missing
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
}
