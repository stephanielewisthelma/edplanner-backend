export interface CreateReminderDTO {
  title: string;
  remindAt: string; // ISO string
  taskId?: string;
}
