export interface CreateClassDTO {
  title: string;
  location?: string | null;
  startTime: string | Date;
  endTime: string | Date;
  subjectId: string;
}

export interface UpdateClassDTO {
  title?: string;
  location?: string | null;
  startTime?: string | Date;
  endTime?: string | Date;
  subjectId?: string;
}
