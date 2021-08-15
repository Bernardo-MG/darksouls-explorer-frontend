import { TestBed } from '@angular/core/testing';
import { GraphDisplayModule } from '../graph-display.module';

import { GraphService } from './graph.service';

describe('GraphService', () => {
  let service: GraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GraphDisplayModule
      ]
    });
    service = TestBed.inject(GraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
