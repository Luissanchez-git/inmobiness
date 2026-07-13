import { TestBed } from '@angular/core/testing';

import { EmployesGuardService } from './employes-guard.service';

describe('EmployesGuardService', () => {
  let service: EmployesGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployesGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
