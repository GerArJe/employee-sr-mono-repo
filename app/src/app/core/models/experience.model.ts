export interface IExperience {
  id: string;
  employeeId: string;
  title: string;
  companyName: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export type ICreateExperienceDTO = Omit<IExperience, 'id'>;

export type IUpdateExperienceDTO = Omit<IExperience, 'id'>;
