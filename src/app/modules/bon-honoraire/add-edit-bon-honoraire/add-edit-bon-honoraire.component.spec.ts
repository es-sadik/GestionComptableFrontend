import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBonHonoraireComponent } from './add-edit-bon-honoraire.component';

describe('AddEditBonHonoraireComponent', () => {
  let component: AddEditBonHonoraireComponent;
  let fixture: ComponentFixture<AddEditBonHonoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBonHonoraireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBonHonoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
