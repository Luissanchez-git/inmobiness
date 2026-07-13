import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeHistoryComponent } from './employe-history.component';

describe('EmployeHistoryComponent', () => {
  let component: EmployeHistoryComponent;
  let fixture: ComponentFixture<EmployeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
