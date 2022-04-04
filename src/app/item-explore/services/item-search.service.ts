import { Injectable } from '@angular/core';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Response } from '@app/api/models/response';

@Injectable()
export class ItemSearchService {

  private itemTagsUrl = environment.apiUrl + "/metadata/tags/Item";

  constructor(
    private client: RequestClient
  ) { }

  getTags():  Observable<string[]> {
    return this.client.request(this.itemTagsUrl).get<string[]>().pipe(map(r => r.content));
  }

}
