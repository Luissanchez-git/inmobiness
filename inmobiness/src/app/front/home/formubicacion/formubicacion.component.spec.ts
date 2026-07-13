import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormubicacionComponent } from './formubicacion.component';

describe('FormubicacionComponent', () => {
  let component: FormubicacionComponent;
  let fixture: ComponentFixture<FormubicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormubicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
