import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReglementFournisseurComponent } from './delete-reglement-fournisseur.component';

describe('DeleteReglementFournisseurComponent', () => {
  let component: DeleteReglementFournisseurComponent;
  let fixture: ComponentFixture<DeleteReglementFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReglementFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReglementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
