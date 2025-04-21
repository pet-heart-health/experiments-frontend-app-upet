import { TestBed } from '@angular/core/testing';

import { MedicalHistoryBaseService } from './medical-history-base.service';

describe('MedicalHistoryBaseService', () => {
  let service: MedicalHistoryBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalHistoryBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
