// src/dtos/task.dto.ts
export interface CreateTaskDTO {
  title: string;
  description?: string;
  dueDate?: string | Date;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  subjectId?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  dueDate?: string | Date | null;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "PENDING" | "DONE";
  subjectId?: string | null;
}
