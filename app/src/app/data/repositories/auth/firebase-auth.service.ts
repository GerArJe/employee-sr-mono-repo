import { Injectable } from '@angular/core';
import { defer, from, Observable, of, switchMap, tap, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  Auth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
} from '@angular/fire/auth';

import { AuthGateway } from '../../../core/gateways/auth.gateway';
import { IAuth } from '../../../core/models/auth.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';
import { IGetTokenRS } from './models/get-token-rs.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService extends AuthGateway {
  tokenUrl: string = `${environment.domainURL}/token`;

  constructor(private auth: Auth, private http: HttpClient) {
    super();
  }

  createAccountWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<IAuth> {
    return defer(() =>
      from(createUserWithEmailAndPassword(this.auth, email, password))
    ).pipe(
      timeout(TIMEOUT_SERVICES),
      switchMap((value: UserCredential) => {
        const register: IAuth = {
          accountId: value.user.uid,
        };
        return of(register);
      })
    );
  }

  loginWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<boolean> {
    return defer(() =>
      from(signInWithEmailAndPassword(this.auth, email, password))
    ).pipe(
      timeout(TIMEOUT_SERVICES),
      switchMap((value: UserCredential) => this.generateToken(value.user.uid))
    );
  }

  signOut(): Observable<void> {
    return defer(() => from(signOut(this.auth))).pipe(
      tap(() => localStorage.clear())
    );
  }

  recoverPassword(email: string): Observable<void> {
    return defer(() => from(sendPasswordResetEmail(this.auth, email)));
  }

  deleteUser(): Observable<void> {
    const user = this.auth.currentUser;
    if (user) {
      return defer(() => from(deleteUser(user)));
    }
    return of();
  }

  generateToken(accountId: string): Observable<boolean> {
    return this.http
      .post<IGetTokenRS>(`${this.tokenUrl}/get-token`, { accountId })
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: IGetTokenRS) => {
          localStorage.setItem('id', response.user.id);
          localStorage.setItem('accountId', response.user.accountId);
          localStorage.setItem('userType', `${response.user.userType}`);
          localStorage.setItem('token', response.token);
          console.log('generateToken');

          return of(true);
        })
      );
  }

  getId(): string {
    return localStorage.getItem('id') || '';
  }
  getAccountId(): string {
    return localStorage.getItem('accountId') || '';
  }
  getUserType(): number {
    return Number(localStorage.getItem('userType'));
  }
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
