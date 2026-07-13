import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecoleccionComponent } from './add-recoleccion.component';

describe('AddRecoleccionComponent', () => {
  let component: AddRecoleccionComponent;
  let fixture: ComponentFixture<AddRecoleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecoleccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecoleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
