import { Injectable } from '@angular/core';
import { GraphQueryService } from './graph-query.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NamedValue } from '@app/models/namedValue';
import { Info } from '../models/info';
import { Graph } from '../models/graph';

@Injectable()
export class GraphService {

  constructor(
    private graphQueryService: GraphQueryService
  ) { }

  getOptions(): Observable<NamedValue[]> {
    return this.graphQueryService.getLinks().pipe(map((types) => types.map((type) => { return { name: type, value: type } as NamedValue })));
  }

  getInfo(id: Number): Observable<Info> {
    return this.graphQueryService.getInfo(id)
  }

  getGraph(options: String[]): Observable<Graph> {
    return this.graphQueryService.getGraph(options);
  }

}
