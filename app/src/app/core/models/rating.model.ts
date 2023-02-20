export interface IRating {
  id: string;
  companyId: string;
  employeeId: string;
  rating: number;
  creationDate: string;
}

export type ICreateRatingDTO = Omit<IRating, "id" | "creationDate">;

export type UpdateRatingDTO = Partial<IRating>;
