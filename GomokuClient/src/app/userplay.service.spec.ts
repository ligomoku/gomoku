import { TestBed, inject } from '@angular/core/testing';

import { UserplayService } from './userplay.service';

describe('UserplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserplayService]
    });
  });

  it('should be created', inject([UserplayService], (service: UserplayService) => {
    expect(service).toBeTruthy();
  }));
});
