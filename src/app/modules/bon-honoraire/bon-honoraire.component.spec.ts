import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonHonoraireComponent } from './bon-honoraire.component';

describe('BonHonoraireComponent', () => {
  let component: BonHonoraireComponent;
  let fixture: ComponentFixture<BonHonoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonHonoraireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonHonoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
