import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: any;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    const authData = { username: email, verify_code: password };
    this.http
      .post('http://localhost:92/api/auth/signup/confirm', authData)
      .subscribe((response) => {
        this.router.navigate["/"];
      },(error)=>{
        this.authStatusListener.next(false);
      });
  }
  login(email: string, password: string) {
    const loginData = { username: email, password: password };
    this.http
      .post<{ status: string; result: any }>(
        'http://localhost:92/api/auth/login',
        loginData
      )
      .subscribe((response) => {
        const token = response?.result[0].token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.result[0].expiresIn;
          this.setAuthTimer(expiresInDuration)
          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(now.getTime() + +expiresInDuration);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }
      },(error)=>{
        this.authStatusListener.next(false);
      });
  }
  autoAuthUser() {
    const authInformation :any = this.getAuthData();
    const now = new Date();
    const expiresIn : any = authInformation?.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation?.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn)
      this.authStatusListener.next(true)
    }
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration){
    console.log("setting timer" ,duration)
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, +duration);
  }

  private saveAuthData(token: string, expirationData: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationData.toISOString());
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
    };
  }
}
