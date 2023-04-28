import { TestBed } from '@angular/core/testing';

import { ReglementClientService } from './reglement-client.service';

describe('ReglementClientService', () => {
  let service: ReglementClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglementClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
