import { TestBed } from '@angular/core/testing';

import { PaginationClient } from './pagination-client';

describe('PaginationClient', () => {
  let service: PaginationClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
