import { Injectable } from '@angular/core';
import { GraphQueryService } from '../../api/services/graph-query.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NamedValue } from '@app/models/namedValue';
import { Item } from '@app/api/models/item';
import { DisplayGraph } from '@app/graph-display/models/displayGraph';
import { Link } from '@app/api/models/link';
import { Node } from '@app/api/models/node';
import { DisplayGraphLink } from '@app/graph-display/models/displayGraphLink';
import { DisplayGraphNode } from '@app/graph-display/models/displayGraphNode';
import { Graph } from '@app/api/models/graph';
import { GraphDisplayModule } from '../graph-display.module';

@Injectable()
export class GraphService {

  constructor(
    private graphQueryService: GraphQueryService
  ) { }

  getOptions(): Observable<NamedValue[]> {
    return this.graphQueryService.getAllTypes().pipe(map((types) => types.map((type) => { return { name: type, value: type } as NamedValue })));
  }

  getInfo(id: Number): Observable<Item> {
    return this.graphQueryService.getOne(id)
  }

  getGraph(options: String[]): Observable<DisplayGraph> {
    return this.graphQueryService.getGraph(options).pipe(map((graph) => this.toDisplayGraph(graph)));
  }

  private toDisplayGraph(graph: Graph): DisplayGraph {
    const links: DisplayGraphLink[] = graph.links.map(this.toGraphLink);
    const nodes: DisplayGraphNode[] = graph.nodes.map(this.toGraphNode);
    const types: String[] = graph.types;

    return { nodes, links, types };
  }

  private toGraphLink(data: Link): DisplayGraphLink {
    return { source: data.sourceId, target: data.targetId, type: data.type };
  }

  private toGraphNode(data: Node): DisplayGraphNode {
    return { id: data.id, name: data.name, x: 0, y: 0 };
  }

}
