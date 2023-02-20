export interface IEducation {
  id: string;
  employeeId: string;
  school: string;
  degree: string;
  startDate: string;
  endDate?: string;
}

export type ICreateEducationDTO = Omit<IEducation, "id">;

export type IUpdateEducationDTO = Omit<IEducation, "id">;
