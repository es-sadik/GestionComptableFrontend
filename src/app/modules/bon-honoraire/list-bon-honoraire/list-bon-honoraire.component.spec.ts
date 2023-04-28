import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonHonoraireComponent } from './list-bon-honoraire.component';

describe('ListBonHonoraireComponent', () => {
  let component: ListBonHonoraireComponent;
  let fixture: ComponentFixture<ListBonHonoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBonHonoraireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonHonoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
