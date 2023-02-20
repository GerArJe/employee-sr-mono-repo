export interface IEmployee {
  id: string;
  accountId: string;
  name: string;
  profileId: string;
  profile?: string;
  cityId: string;
  city?: string;
  cellphone?: string;
  email?: string;
  about?: string;
  skills?: string[];
  softSkills?: string[];
  rating?: number;
}

export type ICreateEmployeeDTO = Omit<
  IEmployee,
  'id' | 'cellphone' | 'email' | 'about' | 'skills' | 'softSkills'
>;

export type IUpdateEmployeeDTO = Omit<IEmployee, 'id'>;
