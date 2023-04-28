import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBonAchatComponent } from './add-edit-bon-achat.component';

describe('AddEditBonAchatComponent', () => {
  let component: AddEditBonAchatComponent;
  let fixture: ComponentFixture<AddEditBonAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBonAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBonAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
