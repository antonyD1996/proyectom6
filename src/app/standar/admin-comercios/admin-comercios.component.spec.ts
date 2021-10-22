import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComerciosComponent } from './admin-comercios.component';

describe('AdminComerciosComponent', () => {
  let component: AdminComerciosComponent;
  let fixture: ComponentFixture<AdminComerciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComerciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComerciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
