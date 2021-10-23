import { TestBed } from '@angular/core/testing';
import { GraphDisplayModule } from '../graph-display.module';

import { HttpClient } from '@angular/common/http';

import { GraphService } from './graph.service';

describe('GraphService', () => {
  let service: GraphService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [
        GraphDisplayModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(GraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
