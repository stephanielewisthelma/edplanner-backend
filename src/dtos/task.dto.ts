// src/dtos/task.dto.ts

export interface CreateTaskDTO {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "PENDING" | "IN_PROGRESS" | "DONE"; 
  subjectId?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "PENDING" | "IN_PROGRESS" | "DONE"; 
  subjectId?: string;
}
