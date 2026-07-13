import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoleccionComponent } from './recoleccion.component';

describe('RecoleccionComponent', () => {
  let component: RecoleccionComponent;
  let fixture: ComponentFixture<RecoleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoleccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
