import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';
import { Node } from '@app/graph/models/node';
import { MapConnection } from '@app/models/mapConnection';
import { Map } from '@app/models/map';
import { Link } from '@app/graph/models/link';
import { Response } from '@app/api/models/response';

@Injectable()
export class MapService {

  private mapUrl = environment.apiUrl + "/maps";

  private mapConnectionUrl = environment.apiUrl + "/maps/connections";

  constructor(
    private client: RequestClient
  ) { }

  getAllMaps(): Observable<Node[]> {
    return this.client.request(this.mapUrl).pageSize(100).order('name', 'asc').get()
      .pipe(map((response) => (response as Response<Map>).content.map(this.toNode)));
  }

  getAllMapConnections(): Observable<Link[]> {
    return this.client.request(this.mapConnectionUrl).pageSize(100).get()
      .pipe(map((response) => (response as Response<MapConnection>).content.map(this.toLink)));
  }

  private toNode(data: Map): Node {
    return { label: data.name, name: data.name, id: data.id.toString() };
  }

  private toLink(data: MapConnection): Link {
    return { source: data.id.toString(), target: data.connection.toString() };
  }

}
