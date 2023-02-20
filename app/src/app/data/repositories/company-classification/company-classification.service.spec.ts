import { TestBed } from '@angular/core/testing';

import { CompanyClassificationService } from './company-classification.service';

describe('CompanyClassificationService', () => {
  let service: CompanyClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
