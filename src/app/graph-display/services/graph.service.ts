import { Injectable } from '@angular/core';
import { GraphQueryService } from './graph-query.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NamedValue } from '@app/models/namedValue';
import { Info } from '../models/info';
import { DisplayGraph } from '../models/displayGraph';
import { Link } from '../models/link';
import { Node } from '../models/node';
import { DisplayGraphLink } from '../models/displayGraphLink';
import { DisplayGraphNode } from '../models/displayGraphNode';
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

  getGraph(options: String[]): Observable<DisplayGraph> {
    return this.graphQueryService.getGraph(options).pipe(map((graph) => this.toDisplayGraph(graph)));
  }

  private toDisplayGraph(graph: Graph): DisplayGraph {
    const links: DisplayGraphLink[] = graph.links.map(this.toGraphLink);
    const nodes: DisplayGraphNode[] = graph.nodes.map(this.toGraphNode);
    const types: string[] = graph.types;

    return { nodes, links, types };
  }

  private toGraphLink(data: Link): DisplayGraphLink {
    return { ...data };
  }

  private toGraphNode(data: Node): DisplayGraphNode {
    return { ...data };
  }

}
