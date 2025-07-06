import { TestBed } from '@angular/core/testing';

import { FavoriteClinicsService } from './favorite-clinics.service';

describe('FavoriteClinicsService', () => {
  let service: FavoriteClinicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteClinicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
