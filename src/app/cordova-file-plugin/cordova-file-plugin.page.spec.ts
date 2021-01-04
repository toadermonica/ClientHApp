import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CordovaFilePluginPage } from './cordova-file-plugin.page';

describe('CordovaFilePluginPage', () => {
  let component: CordovaFilePluginPage;
  let fixture: ComponentFixture<CordovaFilePluginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CordovaFilePluginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CordovaFilePluginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
