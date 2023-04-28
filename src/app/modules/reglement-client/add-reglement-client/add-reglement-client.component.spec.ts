import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReglementClientComponent } from './add-reglement-client.component';

describe('AddReglementClientComponent', () => {
  let component: AddReglementClientComponent;
  let fixture: ComponentFixture<AddReglementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReglementClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReglementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
