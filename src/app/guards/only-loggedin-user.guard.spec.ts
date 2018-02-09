import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyLoggedinUserGuard } from './only-loggedin-user.guard';

describe('OnlyLoggedinUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyLoggedinUserGuard]
    });
  });

  it('should ...', inject([OnlyLoggedinUserGuard], (guard: OnlyLoggedinUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
