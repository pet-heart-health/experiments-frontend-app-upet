import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetOwnerRegisterComponent } from './pet-owner-register.component';

describe('PetOwnerRegisterComponent', () => {
  let component: PetOwnerRegisterComponent;
  let fixture: ComponentFixture<PetOwnerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetOwnerRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetOwnerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
