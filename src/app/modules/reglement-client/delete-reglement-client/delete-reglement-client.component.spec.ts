import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReglementClientComponent } from './delete-reglement-client.component';

describe('DeleteReglementClientComponent', () => {
  let component: DeleteReglementClientComponent;
  let fixture: ComponentFixture<DeleteReglementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReglementClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReglementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
