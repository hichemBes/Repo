import { TestBed } from '@angular/core/testing';

import { DossierCondidatServiceService } from './dossier-condidat-service.service';

describe('DossierCondidatServiceService', () => {
  let service: DossierCondidatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierCondidatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
