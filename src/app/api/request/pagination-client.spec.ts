import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PaginationClient } from './pagination-client';

describe('PaginationClient', () => {
  let service: PaginationClient;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(PaginationClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
