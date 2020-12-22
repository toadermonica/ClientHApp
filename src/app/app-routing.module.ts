import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthguardGuard} from "./services/authguard.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthguardGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'native-storage-example',
    canActivate: [AuthguardGuard],
    loadChildren: () => import('./native-storage-example/native-storage-example.module').then( m => m.NativeStorageExamplePageModule)
  },
  {
    path: 'cordova-file-plugin',
    canActivate: [AuthguardGuard],
    loadChildren: () => import('./cordova-file-plugin/cordova-file-plugin.module').then( m => m.CordovaFilePluginPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
