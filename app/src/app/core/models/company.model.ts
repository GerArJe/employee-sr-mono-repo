export interface ICompany {
  id: string;
  accountId: string;
  name: string;
  nit: string;
  cellphone?: string;
  employeesNumber?: number;
  creationDate?: string;
  classificationId?: string;
  classification?: string;
  web?: string;
}

export type ICreateCompanyDTO = Omit<
  ICompany,
  | "id"
  | "cellphone"
  | "employeesNumber"
  | "creationDate"
  | "classificationId"
  | "web"
>;

export type IUpdateCompanyDTO = Omit<ICompany, "id">;
