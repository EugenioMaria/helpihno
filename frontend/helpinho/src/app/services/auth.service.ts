import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../common/services/api.service';

interface LoginResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http)
  }

  login(user: {username: string, password: string}): Observable<LoginResponse> {
    return this.post<LoginResponse>('login', user);
  }

  register(user: {name: string, email: string, cpfCnpj: string, birthday: string, password: string}): Observable<null> {
    return this.post<null>('register', user);
  }
}
