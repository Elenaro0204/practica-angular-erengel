import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaApiComponent } from './busqueda-api.component';

describe('BusquedaApiComponent', () => {
  let component: BusquedaApiComponent;
  let fixture: ComponentFixture<BusquedaApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusquedaApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
