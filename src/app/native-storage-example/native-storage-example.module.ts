import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NativeStorageExamplePageRoutingModule } from './native-storage-example-routing.module';

import { NativeStorageExamplePage } from './native-storage-example.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NativeStorageExamplePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [NativeStorageExamplePage]
})
export class NativeStorageExamplePageModule {}
