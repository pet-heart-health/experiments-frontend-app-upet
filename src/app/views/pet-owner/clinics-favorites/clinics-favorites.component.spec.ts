import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsFavoritesComponent } from './clinics-favorites.component';

describe('ClinicsFavoritesComponent', () => {
  let component: ClinicsFavoritesComponent;
  let fixture: ComponentFixture<ClinicsFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicsFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicsFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
