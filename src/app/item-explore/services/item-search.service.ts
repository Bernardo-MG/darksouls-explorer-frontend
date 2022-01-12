import { Injectable } from '@angular/core';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ItemSearchService {

  private itemTagsUrl = environment.apiUrl + "/metadata/tags/Item";

  constructor(
    private client: RequestClient
  ) { }

  getTags():  Observable<string[]> {
    return this.client.request(this.itemTagsUrl).get();
  }

}
