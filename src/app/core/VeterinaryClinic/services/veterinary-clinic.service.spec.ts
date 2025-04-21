import { TestBed } from '@angular/core/testing';

import { VeterinaryClinicService } from './veterinary-clinic.service';

describe('VeterinaryClinicService', () => {
  let service: VeterinaryClinicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeterinaryClinicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
