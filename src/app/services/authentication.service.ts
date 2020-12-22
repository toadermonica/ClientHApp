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

  /*Registering a new user*/
  userSignUp(user: User): Promise<HttpResponse<any>> {
    return this.httpClient.post<any>("https://localhost:8443/users/register", user).toPromise()
        .then(res => {return res})
        .catch(error => {return error;}
        );
  }

  /*Logging in an existing user*/
  userSignIn(user: User): Promise<any> {
    return this.httpClient.post<any>("https://localhost:8443/users/register", user).toPromise().then(res => {
      if (!res.accessToken && !res.refreshToken) {
        this.authenticationState.next(true);
        this.storage.ready().then(() => {
          localStorage.setItem(this.ACCESS_TOKEN_KEY, res.accessToken);
          localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refreshToken);
        });
      }
    }).catch(error => {
      return {status: error.status, statusText: error.statusText}
    });
  }

  fakeSignIn(){
    this.authenticationState.next(true);
    const randomAccessToken = "AT" + Math.floor(Math.random() * (999 + 1)).toString();
    const randomRefreshToken = "RT" + Math.floor(Math.random() * (999 + 1)).toString();
    this.storage.ready().then(() => {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, randomAccessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, randomRefreshToken);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

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

  async getTokensFromStorage() {
    const tokens = {access: null, refresh: null};
    return await this.storage.ready().then(() => {
      tokens.access =  localStorage.getItem(this.ACCESS_TOKEN_KEY);
      tokens.refresh =  localStorage.getItem(this.REFRESH_TOKEN_KEY);
      return tokens;
    });
  }
}
