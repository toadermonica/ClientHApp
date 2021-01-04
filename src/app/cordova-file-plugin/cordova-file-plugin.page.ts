import {Component} from '@angular/core';
import {Platform, ViewWillEnter} from "@ionic/angular";
import {File} from '@ionic-native/file/ngx';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-cordova-file-plugin',
  templateUrl: './cordova-file-plugin.page.html',
  styleUrls: ['./cordova-file-plugin.page.scss'],
})
export class CordovaFilePluginPage implements ViewWillEnter{
  internalStorageData: string;
  externalStorageData: string;
  maliciousString: string;
  url: SafeUrl;

  constructor(private file: File, private platform: Platform, private sanitizer: DomSanitizer) {
    this.maliciousString = 'javascript:alert("This is XSS alert demo")';
    this.url = sanitizer.bypassSecurityTrustUrl(this.maliciousString);
  }

  async addDataToInternalStorage() {
    await this.platform.ready().then(() => {
      const fileName = 'FileWithSensitiveData';
      this.file.createFile(this.file.dataDirectory, fileName, true);
      const blob = new Blob([this.internalStorageData], {type: 'text/plain'});
      this.file.writeFile(this.file.dataDirectory, fileName, blob, {replace: true, append:false});
    });
  }
  /*External storage correct example*/
  async addDataToExternalStorage() {
    console.log('External storage data: ', this.externalStorageData);
    await this.platform.ready().then(() => {
      const fileName = 'FileForInternalStorage';
      this.file.createFile(this.file.externalDataDirectory, fileName, true);
      const blob = new Blob([this.internalStorageData], {type: 'text/plain'});
      this.file.writeFile(this.file.externalDataDirectory, fileName, blob, {replace: true, append: false});
    });
  }

  async getDataFromExternalStorage(){
    await this.platform.ready().then(() => {
      const fileName = 'FileForExternalStorage';
      this.file.readAsText(this.file.externalDataDirectory, fileName).then(result => {
        return result;
      }).catch(() => {
        return 'Something went wrong!';
      });
    });
  }

  showInternalStorageData() {}

  ionViewWillEnter(): void {
    this.seeAllDirectories();
  }
  async seeAllDirectories(){
    await this.platform.ready().then(() => {
      console.log('Method - file.dataDirectory');
      console.log('Persistent and private data storage within the application\'s sandbox using internal memory. ');
      console.log('Should contain data needed for the application, which the user does not need to know about: ');
      console.log(this.file.dataDirectory);
      console.log("");
      console.log('Method - file.applicationStorageDirectory');
      console.log('Root directory of the application\'s sandbox');
      console.log('All data stored here is private to the app');
      console.log(this.file.applicationStorageDirectory);
      console.log("");
      console.log('Method - file.applicationDirectory. ');
      console.log('Read-only directory where the application is installed');
      console.log('This folder can contain asset files/ data needed by the application.');
      console.log(this.file.applicationDirectory);
      console.log("");
      console.log('Method - file.externalApplicationStorageDirectory');
      console.log('Application space on external storage');
      console.log(this.file.applicationStorageDirectory);
      console.log("");
      console.log('Method - file.externalDataDirectory');
      console.log('App-specific data files on external storage');
      console.log(this.file.externalDataDirectory);
      console.log("");
      console.log('Method - file.externalRootDirectory');
      console.log('External storage (SD card) root');
      console.log(this.file.externalRootDirectory);
      console.log("");
      console.log('Method - file.cacheDirectory');
      console.log('Directory for cached data files or any files that the app can re-create easily.');
      console.log(this.file.cacheDirectory);
      console.log("");
      console.log('Method - file.externalCacheDirectory');
      console.log('Application cache on external storage');
      console.log(this.file.externalCacheDirectory);
  });
  }
}
