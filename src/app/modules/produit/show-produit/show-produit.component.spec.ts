import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProduitComponent } from './show-produit.component';

describe('ShowProduitComponent', () => {
  let component: ShowProduitComponent;
  let fixture: ComponentFixture<ShowProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
