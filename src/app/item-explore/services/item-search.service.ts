import { Injectable } from '@angular/core';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';

@Injectable()
export class ItemSearchService {

  private itemTagsUrl = environment.apiUrl + "/metadata/tags/Item";

  constructor(
    private client: RequestClient
  ) { }

  getTags(){
    return this.client.request(this.itemTagsUrl).get();
  }

}
