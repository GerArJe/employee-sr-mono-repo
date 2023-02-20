import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthGateway } from '../gateways/auth.gateway';
import { IAuth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthUseCase {
  constructor(private _registerGateway: AuthGateway) {}

  createAccountWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<IAuth> {
    return this._registerGateway.createAccountWithEmailAndPassword(
      email,
      password
    );
  }

  loginWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<boolean> {
    return this._registerGateway.loginWithEmailAndPassword(email, password);
  }

  signOut(): Observable<void> {
    return this._registerGateway.signOut();
  }

  recoverPassword(email: string): Observable<void> {
    return this._registerGateway.recoverPassword(email);
  }

  deleteUser(): Observable<void> {
    return this._registerGateway.deleteUser();
  }

  generateToken(accountId: string): Observable<boolean> {
    return this._registerGateway.generateToken(accountId);
  }

  getId(): string {
    return this._registerGateway.getId();
  }

  getAccountId(): string {
    return this._registerGateway.getAccountId();
  }

  getUserType(): number {
    return this._registerGateway.getUserType();
  }

  getToken(): string {
    return this._registerGateway.getToken();
  }
}
