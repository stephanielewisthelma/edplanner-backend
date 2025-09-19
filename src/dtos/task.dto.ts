export interface CreateTaskDTO {
  title: string;
  description?: string;
  dueDate?: string; // ISO string
  priority?: "LOW" | "MEDIUM" | "HIGH";
  subjectId?: string;
}
