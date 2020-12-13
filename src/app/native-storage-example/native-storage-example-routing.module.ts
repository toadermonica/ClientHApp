import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NativeStorageExamplePage } from './native-storage-example.page';

const routes: Routes = [
  {
    path: '',
    component: NativeStorageExamplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NativeStorageExamplePageRoutingModule {}
