import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReglementClientComponent } from './show-reglement-client.component';

describe('ShowReglementClientComponent', () => {
  let component: ShowReglementClientComponent;
  let fixture: ComponentFixture<ShowReglementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReglementClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReglementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
