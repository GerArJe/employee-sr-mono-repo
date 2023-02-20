import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timeout } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  ICreateRatingDTO,
  IRating,
} from '../../../core/models/rating.model';
import { IEmployee } from '../../../core/models/employee.model';
import { environment } from '../../../../environments/environment';
import { RatingGateway } from '../../../core/gateways/rating.gateway';
import { IGetRecommendationsRS } from './models/get-recomendations-rs.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';
import { IRatingRS } from './models/rating-rs.model';

@Injectable({
  providedIn: 'root',
})
export class RatingService extends RatingGateway {
  ratingUrl: string = `${environment.domainURL}/ratings`;

  constructor(private http: HttpClient) {
    super();
  }

  getRecommendations(
    companyId: string,
    page: number,
    offset: number
  ): Observable<IEmployee[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('page', page);
    params = params.set('offset', offset);
    return this.http
      .post<IGetRecommendationsRS>(
        `${this.ratingUrl}/recommendations`,
        {
          companyId,
        },
        {
          params,
        }
      )
      .pipe(
        timeout(TIMEOUT_SERVICES * 2),
        switchMap((response: IGetRecommendationsRS) => of(response.data))
      );
  }

  createRating(rating: ICreateRatingDTO): Observable<IRating> {
    return this.http.post<IRatingRS>(`${this.ratingUrl}`, rating).pipe(
      timeout(TIMEOUT_SERVICES),
      switchMap((response: IRatingRS) => of(response.data))
    );
  }
}
