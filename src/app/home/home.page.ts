import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {ViewWillEnter} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit, ViewWillEnter{

  accessTokenValue: string;
  refreshTokenValue: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.getTokens().then(response => {
      console.log('My response in ngoninit first shot is now : ', response);
      this.accessTokenValue = response.access;
      this.refreshTokenValue = response.refresh;
    });
  }
  ionViewWillEnter(){
    this.getTokens().then(response => {
      console.log('My response in ngoninit first shot is now : ', response);
      this.accessTokenValue = response.access;
      this.refreshTokenValue = response.refresh;
    });
  }
  ngAfterViewInit(){
    this.getTokens().then(response => {
      console.log('My response in ngafterviewinit first shot is now : ', response);
      this.accessTokenValue = response.access;
      this.refreshTokenValue = response.refresh;
    });

    /*.then(response => {
      console.log('I am ngoninit going once');
      this.accessTokenValue = response.access;
      this.refreshTokenValue = response.refresh;
      console.log('Refresh is : ', response.refresh);
      console.log('Access is : ', response.access);
    });*/
  }

  logoutUser() {
    this.authService.logout();
  }

  getTokens(): Promise<{access: string, refresh: string}>{
    return this.authService.getTokensFromStorage().then(response => {
      return response;
    });
  }
}
