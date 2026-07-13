import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreoViewComponent } from './rastreo-view.component';

describe('RastreoViewComponent', () => {
  let component: RastreoViewComponent;
  let fixture: ComponentFixture<RastreoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RastreoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RastreoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
