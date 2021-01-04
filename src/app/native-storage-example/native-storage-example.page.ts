import { Component, OnInit } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {Platform, ViewDidEnter, ViewWillEnter} from "@ionic/angular";
import {forEach} from "@angular-devkit/schematics";

@Component({
  selector: 'app-native-storage-example',
  templateUrl: './native-storage-example.page.html',
  styleUrls: ['./native-storage-example.page.scss'],
})
export class NativeStorageExamplePage implements OnInit, ViewWillEnter{
  nativeStorageData:string [] = [];
  insertDataTitle: string;
  insertDataContent: string;
  deleteData: string;

  constructor(private nativeStorage: NativeStorage, private platform: Platform) { }

  ionViewWillEnter (): void {
    this.getAllData();
  }

  ngOnInit() {}

  async getAllData() {
    await this.platform.ready().then(() =>{
      this.nativeStorage.keys().then(keyArray => {
        //get all data from storage using keyArray
        for(const key of keyArray){
          this.nativeStorage.getItem(key).then(value => {
            this.nativeStorageData.push(key);
            this.nativeStorageData.push(value.data);
          });
        }
      });
    });
  }

  addData() {
    //if there is data title and content then see if data exists in storage and save
    if(this.insertDataTitle && this.insertDataContent){
      if(this.findByReference(this.insertDataTitle)){
        this.saveData(this.insertDataTitle, this.insertDataContent);
      }
    }
  }

  async deleteSelected() {
    if(this.deleteData){
      await this.platform.ready().then(() => {
        this.nativeStorage.remove(this.deleteData);
        this.getAllData();
      });
    }
  }

  deleteAll() {
    this.deleteAllNativeStorageData();
  }

  private async saveData(reference:string, value:string){
    await this.platform.ready().then(() => {
      console.log('I have set an item ', reference, ' and content ', value);
      this.nativeStorage.setItem(reference, {data: value});
      return;
    });
  }
  private async findByReference(reference: string):Promise<boolean> {
    await this.platform.ready().then(() => {
      return this.nativeStorage.getItem(reference).then(value => {
        return !!value;
      }).catch(() => {
        return false;
      });
    });
    return false;
  }
  private async deleteAllNativeStorageData():Promise<boolean>{
    await this.platform.ready().then(() => {
      this.nativeStorage.clear().then(()=>{
        return true;
      });
    });
    return false;
  }
}
