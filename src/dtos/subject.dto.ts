// src/dtos/subject.dto.ts

export interface CreateSubjectDTO {
  name: string;
  description?: string | null;
}

export interface UpdateSubjectDTO {
  name?: string;
  description?: string | null;
}
