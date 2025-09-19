export interface CreateClassDTO {
  title: string;
  location?: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  subjectId: string;
}
