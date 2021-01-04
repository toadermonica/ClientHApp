import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CordovaFilePluginPageRoutingModule } from './cordova-file-plugin-routing.module';

import { CordovaFilePluginPage } from './cordova-file-plugin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CordovaFilePluginPageRoutingModule
  ],
  declarations: [CordovaFilePluginPage]
})
export class CordovaFilePluginPageModule {}
