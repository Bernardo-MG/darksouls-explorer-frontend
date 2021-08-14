import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Observable, of } from 'rxjs';

import { GraphService } from '@app/api/services/graph.service';
import { GraphViewComponent } from './graph-view.component';
import { Graph } from '@app/api/models/graph';

class MockedGraphService {

  getGraph(relationship: String): Observable<Graph> {
    return of({ nodes: [], links: [], types: [] });
  }

}

describe('GraphComponent', () => {
  let component: GraphViewComponent;
  let fixture: ComponentFixture<GraphViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphViewComponent],
      imports: [RouterTestingModule, ApolloTestingModule],
      providers: [
        { provides: GraphService, useClass: MockedGraphService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
