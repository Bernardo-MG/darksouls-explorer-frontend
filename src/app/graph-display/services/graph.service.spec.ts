import { TestBed } from '@angular/core/testing';
import { GraphDisplayModule } from '../graph-display.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GraphService } from './graph.service';
import { HttpClient } from '@angular/common/http';

describe('GraphService', () => {
  let service: GraphService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        GraphDisplayModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(GraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
