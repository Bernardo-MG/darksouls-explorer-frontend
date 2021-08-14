import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Graph } from '@app/models/graph';
import { NamedValue } from '@app/models/namedValue';

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
}
