import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { CalcService } from './calc.service';
import { tick } from "@angular/core/testing";
import { flush } from "@angular/core/testing";

describe('CalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcService]
    });
  });

  it('should be created', inject([CalcService], (service: CalcService) => {
    expect(service).toBeTruthy();
  }));

  it('should do the sum', inject([CalcService], (service: CalcService) => {
    expect(service.sum(3, 4)).toBe(7);
  }));

  /*
  - async
  - fakeAsync + tick
  - flush

  - done
  */
  it('should do the sum asynchronosly', fakeAsync(inject([CalcService], (service: CalcService) => {
    //?async
    service.sumAsync(3, 4).then(result => {
      expect(result).toBe(7);
    });
    flush();
  })));
});
