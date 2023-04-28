import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBonAchatComponent } from './show-bon-achat.component';

describe('ShowBonAchatComponent', () => {
  let component: ShowBonAchatComponent;
  let fixture: ComponentFixture<ShowBonAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBonAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBonAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
