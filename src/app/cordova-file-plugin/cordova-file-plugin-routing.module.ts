import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CordovaFilePluginPage } from './cordova-file-plugin.page';

const routes: Routes = [
  {
    path: '',
    component: CordovaFilePluginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CordovaFilePluginPageRoutingModule {}
