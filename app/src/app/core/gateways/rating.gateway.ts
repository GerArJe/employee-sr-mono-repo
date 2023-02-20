import { Observable } from 'rxjs';

import { IEmployee } from '../models/employee.model';
import { ICreateRatingDTO, IRating } from '../models/rating.model';

export abstract class RatingGateway {
  abstract getRecommendations(
    companyId: string,
    page: number,
    offset: number
  ): Observable<IEmployee[]>;
  abstract createRating(rating: ICreateRatingDTO): Observable<IRating>;
}
