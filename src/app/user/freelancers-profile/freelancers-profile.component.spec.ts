import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancersProfileComponent } from './freelancers-profile.component';

describe('FreelancersProfileComponent', () => {
  let component: FreelancersProfileComponent;
  let fixture: ComponentFixture<FreelancersProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancersProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
