import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancersContractComponent } from './freelancers-contract.component';

describe('FreelancersContractComponent', () => {
  let component: FreelancersContractComponent;
  let fixture: ComponentFixture<FreelancersContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancersContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancersContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
