
export interface CreateReminderDTO {
  title: string;
  remindAt: string | Date;
  taskId?: string;
}
