import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBonHonoraireComponent } from './delete-bon-honoraire.component';

describe('DeleteBonHonoraireComponent', () => {
  let component: DeleteBonHonoraireComponent;
  let fixture: ComponentFixture<DeleteBonHonoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBonHonoraireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBonHonoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
