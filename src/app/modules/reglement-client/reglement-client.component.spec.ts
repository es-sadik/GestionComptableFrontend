import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementClientComponent } from './reglement-client.component';

describe('ReglementClientComponent', () => {
  let component: ReglementClientComponent;
  let fixture: ComponentFixture<ReglementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglementClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
