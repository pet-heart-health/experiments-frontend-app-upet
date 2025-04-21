import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVetComponent } from './home-vet.component';

describe('HomeVetComponent', () => {
  let component: HomeVetComponent;
  let fixture: ComponentFixture<HomeVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeVetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
