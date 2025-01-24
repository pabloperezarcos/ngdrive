import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCargaComponent } from './registrar-carga.component';

describe('RegistrarCargaComponent', () => {
  let component: RegistrarCargaComponent;
  let fixture: ComponentFixture<RegistrarCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCargaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
