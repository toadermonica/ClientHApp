import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NativeStorageExamplePage } from './native-storage-example.page';

describe('NativeStorageExamplePage', () => {
  let component: NativeStorageExamplePage;
  let fixture: ComponentFixture<NativeStorageExamplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NativeStorageExamplePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NativeStorageExamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
