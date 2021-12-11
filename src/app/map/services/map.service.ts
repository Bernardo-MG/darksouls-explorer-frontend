import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestClient } from '@app/api/request/request-client';
import { Response } from '@app/api/models/response';
import { environment } from 'environments/environment';
import { Map } from '@app/models/map';
import { MapConnection } from '@app/models/mapConnection';

@Injectable()
export class MapService {

  private mapUrl = environment.apiUrl + "/maps";

  private mapConnectionUrl = environment.apiUrl + "/maps/connections";

  constructor(
    private client: RequestClient
  ) { }

  getAllMaps(): Observable<Response<Map>> {
    return this.client.request(this.mapUrl).pageSize(100).order('name', 'asc').get();
  }

  getAllMapConnections(): Observable<Response<MapConnection>> {
    return this.client.request(this.mapConnectionUrl).pageSize(100).get();
  }

}
