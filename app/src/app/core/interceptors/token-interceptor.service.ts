import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { AuthUseCase } from '../usecases/auth.usecase';
import { EventBusService } from '../../shared/services/event-bus.service';
import { EventData } from '../../shared/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  constructor(
    private authUseCase: AuthUseCase,
    private eventBusService: EventBusService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.addToken(request, next).pipe(
      catchError((error) => {
        const req = request.clone();
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('token/get-token' || 'identitytoolkit') &&
          (error.status === HttpStatusCode.Unauthorized ||
            error.status === HttpStatusCode.Forbidden)
        ) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    let request = req;
    if (token && !req.url.includes('token/get-token')) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      if (this.authUseCase.getToken()) {
        return this.authUseCase
          .generateToken(this.authUseCase.getAccountId())
          .pipe(
            switchMap(() => {
              this.isRefreshing = false;
              const newToken = this.authUseCase.getToken();
              const req = request.clone({
                setHeaders: {
                  authorization: `Bearer ${newToken}`,
                },
              });
              return next.handle(req);
            }),
            catchError((error) => {
              this.isRefreshing = false;
              if (error.status == '403') {
                this.eventBusService.emit(new EventData('logout', null));
              }
              return throwError(() => error);
            })
          );
      }
    }
    return next.handle(request);
  }
}

export const tokenInterceptorServiceProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
];
