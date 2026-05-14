import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialpropiedadesComponent } from './historialpropiedades.component';

describe('HistorialpropiedadesComponent', () => {
  let component: HistorialpropiedadesComponent;
  let fixture: ComponentFixture<HistorialpropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialpropiedadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialpropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
