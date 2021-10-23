import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GraphQueryService } from './graph-query.service';

describe('GraphQueryService', () => {
  let service: GraphQueryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(GraphQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
