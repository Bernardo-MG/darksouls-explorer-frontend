import { Injectable } from '@angular/core';
import { RequestClient } from '@app/api/request/handlers/request-client';
import { ApiResponse } from '@app/api/models/api-response';
import { Graph } from '@app/graph/models/graph';
import { Link } from '@app/graph/models/link';
import { Node } from '@app/graph/models/node';
import { Map } from '@app/models/map';
import { MapConnection } from '@app/models/mapConnection';
import { environment } from 'environments/environment';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MapService {

  private mapUrl = environment.apiUrl + "/maps";

  private mapConnectionUrl = environment.apiUrl + "/maps/connections";

  constructor(
    private client: RequestClient
  ) { }

  getMapGraph(): Observable<Graph> {
    return forkJoin({ nodes: this.getAllMaps(), links: this.getAllMapConnections(), categories: of([{ name: 'Map' }]) })
  }

  private getAllMaps(): Observable<Node[]> {
    return this.client.get<Map>(this.mapUrl).sort({property:'name',order:'asc'}).fetch()
      .pipe(map((response) => (response as ApiResponse<Map[]>).content.map(this.toNode)));
  }

  private getAllMapConnections(): Observable<Link[]> {
    return this.client.get(this.mapConnectionUrl).fetch()
      .pipe(map((response) => (response as ApiResponse<MapConnection[]>).content.map(this.toLink)));
  }

  private toNode(data: Map): Node {
    return { label: data.name, name: data.name, id: data.id.toString(), category: 0 };
  }

  private toLink(data: MapConnection): Link {
    return { source: data.id.toString(), target: data.connection.toString() };
  }

}
