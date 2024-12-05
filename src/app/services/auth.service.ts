import { inject, Injectable } from '@angular/core';
import { UserDto } from '../models/user-dto.model';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../models/login-dto.model';
import { Observable } from 'rxjs';
import { ResultDto } from '../models/result-dto.model';
import { JwtHelperService } from './jwt-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtKey: string = "oas-token";
  private _http: HttpClient;
  private _jwtHelper : JwtHelperService;
  constructor() {
    this._http = inject(HttpClient);
    this._jwtHelper = inject(JwtHelperService);
  }

  login(item: LoginDto): Observable<ResultDto<string>> {
    return this._http.post<ResultDto<string>>("http://localhost:5100/api/auth/login", item);
  }

  isLogin(): boolean {
    let user = localStorage.getItem(this.jwtKey);
    return user ? true : false;
  }
  setLocalToken(token: string) {
    localStorage.setItem(this.jwtKey, token);
  }
  getLocalToken(): string | null {
    return localStorage.getItem(this.jwtKey);
  }
  removeLocalToken() {
    localStorage.removeItem(this.jwtKey);
  }
  getLocalUser():UserDto{
    let token = localStorage.getItem(this.jwtKey);
    let user = this._jwtHelper.decodeToken(token!) as UserDto;
    return user 
  }



}
