import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RequestClient } from './request-client';

describe('RequestClient', () => {
  let service: RequestClient;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(RequestClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
