import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProduitComponent } from './delete-produit.component';

describe('DeleteProduitComponent', () => {
  let component: DeleteProduitComponent;
  let fixture: ComponentFixture<DeleteProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
