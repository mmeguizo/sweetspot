import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserToken, User, JWTPayload } from '../../lib/api-interfaces';
import * as jwt_decode from 'jose';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public options!: HttpHeaders;
  public auth: any;
  public userData!: UserToken;
  constructor(
    public cs: ConnectionService,
    private http: HttpClient,
    private router: Router
  ) {}

  loadToken() {
    const token = localStorage.getItem('token');
    this.auth = token;
    return token;
  }

  createHeaders() {
    this.loadToken();
    this.options = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.auth
    });
  }

  isTheTokenExpired(token: any) {
    const { iat, exp } = jwt_decode.decodeJwt(token);
    return this.isTokenExpired(iat, exp);
  }

 

  AuthGuard() {
    const token = this.loadToken();
    if(token && token !== ''){
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date()).getTime() / 1000)) < expiry;
    }else{
        return false
    }
  }


  isTokenExpired(iat: any, exp: any) {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (exp && exp < nowInSeconds) {
      return true;
    }
    if (iat && iat > nowInSeconds) {
      return true;
    }
    return false;
  }

  storeUserData(token: string,) {
    localStorage.setItem('token', token);
    this.auth = token;
    // this.userData = jwt_decode.decodeJwt(token);
    const { iat, exp,id,deleted,...userData } = jwt_decode.decodeJwt(token);

    localStorage.setItem('user', JSON.stringify(this.userData));

  }

  decode(token: string) {
    return jwt_decode.decodeJwt(token);
  }

  login(user: User) {
    return this.http.post(this.cs.domain + '/users/login', user);
  }

  logout() {
    this.auth = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getTokenRole(){
    const { role } = jwt_decode.decodeJwt(this.auth)
    return role
  }

  

}
