import { TestBed } from '@angular/core/testing';

import { SurgerieService } from './surgerie.service';

describe('SurgerieService', () => {
  let service: SurgerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurgerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
