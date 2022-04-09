import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PaginatedRequestClient } from './paginated-request-client';


describe('PaginatedRequestClient', () => {
  let service: PaginatedRequestClient;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(PaginatedRequestClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
