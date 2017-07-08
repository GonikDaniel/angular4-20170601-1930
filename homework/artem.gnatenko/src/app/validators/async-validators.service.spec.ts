import { TestBed, inject } from '@angular/core/testing';

import { AsyncValidatorsService } from './async-validators.service';

describe('AsyncValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsyncValidatorsService]
    });
  });

  it('should be created', inject([AsyncValidatorsService], (service: AsyncValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
