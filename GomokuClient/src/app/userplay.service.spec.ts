import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserplayService } from './userplay.service';

describe('UserplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserplayService],
    });
  });

  it('should be created', inject([UserplayService], (service: UserplayService) => {
    expect(service).toBeTruthy();
  }));
});
