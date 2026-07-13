import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentarComponent } from './rentar.component';

describe('RentarComponent', () => {
  let component: RentarComponent;
  let fixture: ComponentFixture<RentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
