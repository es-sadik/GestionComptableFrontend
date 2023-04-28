import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementFournisseurComponent } from './reglement-fournisseur.component';

describe('ReglementFournisseurComponent', () => {
  let component: ReglementFournisseurComponent;
  let fixture: ComponentFixture<ReglementFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglementFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
