// src/dtos/reminder.dto.ts
export interface CreateReminderDTO {
  title: string;
  remindAt: string | Date;
  taskId?: string;
}
