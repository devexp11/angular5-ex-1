import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFreelancersComponent } from './invite-freelancers.component';

describe('InviteFreelancersComponent', () => {
  let component: InviteFreelancersComponent;
  let fixture: ComponentFixture<InviteFreelancersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteFreelancersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
