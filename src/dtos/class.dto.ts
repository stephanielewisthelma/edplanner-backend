// src/dtos/class.dto.ts
export interface ClassDTO {
  title: string;
  location?: string; // optional -> normalize to null
  startTime: string | Date; // accept ISO string or Date
  endTime: string | Date;
  subjectId: string;
}
