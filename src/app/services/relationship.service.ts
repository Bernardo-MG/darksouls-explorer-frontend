import { Injectable } from '@angular/core';
import { GraphService } from '../api/services/graph.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NamedValue } from '@app/models/namedValue';
import { Item } from '@app/api/models/item';
import { DisplayGraph } from '@app/graph-display/models/displayGraph';
import { Link } from '@app/api/models/link';
import { Node } from '@app/api/models/node';
import { GraphLink } from '@app/graph-display/models/graphLink';
import { GraphNode } from '@app/graph-display/models/graphNode';
import { Graph } from '@app/api/models/graph';

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

  getGraph(options: String[]): Observable<DisplayGraph> {
    return this.graphService.getGraph(options).pipe(map((graph) => this.toDisplayGraph(graph)));
  }

  private toDisplayGraph(graph: Graph): DisplayGraph {
    const links: GraphLink[] = graph.links.map(this.toGraphLink);
    const nodes: GraphNode[] = graph.nodes.map(this.toGraphNode);
    const types: String[] = graph.types;

    return { nodes, links, types };
  }

  private toGraphLink(data: Link): GraphLink {
    return { source: data.sourceId, target: data.targetId, type: data.type };
  }

  private toGraphNode(data: Node): GraphNode {
    return { id: data.id, name: data.name, x: 0, y: 0 };
  }

}
