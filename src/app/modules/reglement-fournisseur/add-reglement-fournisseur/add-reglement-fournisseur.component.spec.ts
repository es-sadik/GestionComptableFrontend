import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReglementFournisseurComponent } from './add-reglement-fournisseur.component';

describe('AddReglementFournisseurComponent', () => {
  let component: AddReglementFournisseurComponent;
  let fixture: ComponentFixture<AddReglementFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReglementFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReglementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
