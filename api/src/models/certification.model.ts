export interface ICertification {
  id: string;
  employeeId: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
}

export type ICreateCertificationDTO = Omit<ICertification, "id">;

export type IUpdateCertificationDTO = Omit<ICertification, "id">;
