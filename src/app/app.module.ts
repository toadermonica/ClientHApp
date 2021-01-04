import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationService} from "./services/authentication.service";
import {AuthguardGuard} from "./services/authguard.guard";

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { File } from '@ionic-native/file/ngx';

import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot({
      name: 'CHADB',
      driverOrder: ['sqlite']
    }), HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    AuthguardGuard,
    AuthenticationService,
    NativeStorage,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
