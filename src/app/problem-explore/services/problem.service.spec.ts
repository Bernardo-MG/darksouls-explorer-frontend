import { TestBed } from '@angular/core/testing';

import { ProblemService } from './problem.service';

describe('ProblemServiceService', () => {
  let service: ProblemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
