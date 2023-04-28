import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReglementFournisseurComponent } from './show-reglement-fournisseur.component';

describe('ShowReglementFournisseurComponent', () => {
  let component: ShowReglementFournisseurComponent;
  let fixture: ComponentFixture<ShowReglementFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReglementFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReglementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
