import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RatingGateway } from '../gateways/rating.gateway';
import { IEmployee } from '../models/employee.model';
import { ICreateRatingDTO, IRating } from '../models/rating.model';

@Injectable({
  providedIn: 'root',
})
export class RatingUseCase {
  constructor(private _ratingGateway: RatingGateway) {}

  getRecommendations(
    companyId: string,
    page: number,
    offset: number
  ): Observable<IEmployee[]> {
    return this._ratingGateway.getRecommendations(companyId, page, offset);
  }
  createRating(rating: ICreateRatingDTO): Observable<IRating> {
    return this._ratingGateway.createRating(rating);
  }
}
