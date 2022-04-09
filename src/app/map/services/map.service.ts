import { Injectable } from '@angular/core';
import { Response } from '@app/api/request/models/response';
import { PaginatedRequestClient } from '@app/api/request/handlers/paginated-request-client';
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
    private client: PaginatedRequestClient
  ) { }

  getMapGraph(): Observable<Graph> {
    return forkJoin({ nodes: this.getAllMaps(), links: this.getAllMapConnections(), categories: of([{ name: 'Map' }]) })
  }

  private getAllMaps(): Observable<Node[]> {
    return this.client.request(this.mapUrl).pageSize(100).order('name', 'asc').getResponse()
      .pipe(map((response) => (response as Response<Map[]>).content.map(this.toNode)));
  }

  private getAllMapConnections(): Observable<Link[]> {
    return this.client.request(this.mapConnectionUrl).pageSize(100).getResponse()
      .pipe(map((response) => (response as Response<MapConnection[]>).content.map(this.toLink)));
  }

  private toNode(data: Map): Node {
    return { label: data.name, name: data.name, id: data.id.toString(), category: 0 };
  }

  private toLink(data: MapConnection): Link {
    return { source: data.id.toString(), target: data.connection.toString() };
  }

}
