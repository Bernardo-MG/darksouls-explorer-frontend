import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Graph } from '@app/models/graph';
import { NamedValue } from '@app/models/namedValue';
import { Item } from '@app/models/item';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  constructor(
    private graphService: GraphService
  ) { }

  getOptions(): Observable<NamedValue[]> {
    return this.graphService.getAllTypes().pipe(map((types) => types.map((type) => { return { name: type, value: type } as NamedValue })));
  }

  getInfo(id: Number): Observable<Item> {
    return this.graphService.getOne(id)
  }
  
  getGraph(options: String[]): Observable<Graph> {
    return this.graphService.getGraph(options);
  }

}
