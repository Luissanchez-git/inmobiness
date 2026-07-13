import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeHomeComponent } from './employe-home.component';

describe('EmployeHomeComponent', () => {
  let component: EmployeHomeComponent;
  let fixture: ComponentFixture<EmployeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
