import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBonAchatComponent } from './delete-bon-achat.component';

describe('DeleteBonAchatComponent', () => {
  let component: DeleteBonAchatComponent;
  let fixture: ComponentFixture<DeleteBonAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBonAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBonAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
