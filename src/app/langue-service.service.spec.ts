import { TestBed } from '@angular/core/testing';

import { LangueServiceService } from './langue-service.service';

describe('LangueServiceService', () => {
  let service: LangueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
