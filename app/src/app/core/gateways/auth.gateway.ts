import { Observable } from 'rxjs';

import { IAuth } from '../models/auth.model';

export abstract class AuthGateway {
  abstract createAccountWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<IAuth>;

  abstract loginWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<boolean>;

  abstract signOut(): Observable<void>;

  abstract recoverPassword(email: string): Observable<void>;

  abstract deleteUser(): Observable<void>;

  abstract generateToken(accountId: string): Observable<boolean>;

  abstract getId(): string;

  abstract getAccountId(): string;

  abstract getUserType(): number;

  abstract getToken(): string;
}
