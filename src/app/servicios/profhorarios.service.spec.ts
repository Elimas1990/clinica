import { TestBed } from '@angular/core/testing';

import { ProfhorariosService } from './profhorarios.service';

describe('ProfhorariosService', () => {
  let service: ProfhorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfhorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
