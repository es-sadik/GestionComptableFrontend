import { TestBed } from '@angular/core/testing';

import { BonHonoraireService } from './bon-honoraire.service';

describe('BonHonoraireService', () => {
  let service: BonHonoraireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonHonoraireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
