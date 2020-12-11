import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {tap} from "rxjs/operators";
import {User} from "../interfaces/user";
import {AuthResponse} from "../interfaces/auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private AUTH_SERVER_ADDRESS = 'https://localhost:8443';
  private ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
  private REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
  private authenticateUserApi = this.AUTH_SERVER_ADDRESS + '/users/login';
  private registerUserApi = this.AUTH_SERVER_ADDRESS + '/users/register';
  authenticationState = new BehaviorSubject(false);
  constructor(private router: Router,
              private storage: Storage,
              private platform: Platform,
              private httpClient: HttpClient) {
    this.platform.ready().then(() => {
      this.isLoggedIn();
    });
  }

  userSignUp(user: User): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.registerUserApi, user).pipe(
        tap(async (res: any) => {
          console.log('The response is now: ', res);
          console.log('Yey we have a new user now!');
        })
    );
  }

  userSignIn(user: User): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.authenticateUserApi, user).pipe(
        tap(async (res: any) => {
          if (res.accessToken && res.refreshToken) {
            this.authenticationState.next(true);
            this.storage.ready().then(() => {
              localStorage.setItem(this.ACCESS_TOKEN_KEY, res.accessToken);
              localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refreshToken);
            });
          }
        })
    );
  }
  fakeSignIn(){
    this.authenticationState.next(true);
    this.storage.ready().then(() => {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, 'mock_acc_token');
      localStorage.setItem(this.REFRESH_TOKEN_KEY, 'mock_refresh_token');
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
a
  isLoggedIn() {
    this.storage.ready().then(() => {
      const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
      console.log('TOKEN: ', token);
      if (token) {
        this.authenticationState.next(true);
      }
    });
  }

  async logout() {
    await this.storage.ready().then(() => {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    });
    this.authenticationState.next(false);
  }

  getTokensFromStorage() {
    return {
      access: localStorage.getItem(this.ACCESS_TOKEN_KEY),
      refresh: localStorage.getItem(this.REFRESH_TOKEN_KEY)
    };
  }
}
