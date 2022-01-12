import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ItemSearchService } from './item-search.service';

describe('ItemSearchService', () => {
  let service: ItemSearchService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ItemSearchService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ItemSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
