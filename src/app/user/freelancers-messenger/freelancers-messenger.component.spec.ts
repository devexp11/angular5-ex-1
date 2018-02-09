import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancersMessengerComponent } from './freelancers-messenger.component';

describe('FreelancersMessengerComponent', () => {
  let component: FreelancersMessengerComponent;
  let fixture: ComponentFixture<FreelancersMessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancersMessengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancersMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
