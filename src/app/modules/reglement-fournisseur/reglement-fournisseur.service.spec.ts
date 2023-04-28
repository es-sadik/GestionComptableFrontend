import { TestBed } from '@angular/core/testing';

import { ReglementFournisseurService } from './reglement-fournisseur.service';

describe('ReglementFournisseurService', () => {
  let service: ReglementFournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglementFournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
