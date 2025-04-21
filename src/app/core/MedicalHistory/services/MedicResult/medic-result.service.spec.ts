import { TestBed } from '@angular/core/testing';
import { MedicResultService } from './medic-result.service';


describe('MedicResultService', () => {
  let service: MedicResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
