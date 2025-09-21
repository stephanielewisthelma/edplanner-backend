export interface CreateSubjectDTO {
  title: string;
  color?: string | null;
}

export interface UpdateSubjectDTO {
  title?: string;
  color?: string | null;
}
