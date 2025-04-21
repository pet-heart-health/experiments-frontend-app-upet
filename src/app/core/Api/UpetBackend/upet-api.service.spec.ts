import { TestBed } from '@angular/core/testing';

import { UpetApiService } from './upet-api.service'; // Ensure this path is correct and the file exists

describe('UpetApiService', () => {
  let service: UpetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
