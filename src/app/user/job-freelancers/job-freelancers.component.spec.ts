import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFreelancersComponent } from './job-freelancers.component';

describe('JobFreelancersComponent', () => {
  let component: JobFreelancersComponent;
  let fixture: ComponentFixture<JobFreelancersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobFreelancersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
