import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteUploadComponent } from './route-upload.component';

describe('RouteUploadComponent', () => {
  let component: RouteUploadComponent;
  let fixture: ComponentFixture<RouteUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
