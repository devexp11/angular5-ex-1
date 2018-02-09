import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsCreateComponent } from './my-projects-create.component';

describe('MyProjectsCreateComponent', () => {
  let component: MyProjectsCreateComponent;
  let fixture: ComponentFixture<MyProjectsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProjectsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
