import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBonHonoraireComponent } from './show-bon-honoraire.component';

describe('ShowBonHonoraireComponent', () => {
  let component: ShowBonHonoraireComponent;
  let fixture: ComponentFixture<ShowBonHonoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBonHonoraireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBonHonoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
