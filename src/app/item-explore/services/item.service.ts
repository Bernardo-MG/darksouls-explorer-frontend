import { Injectable } from '@angular/core';
import { Item } from '@app/models/item';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RequestClient } from '@app/api/request/request-client';
import { Response } from '@app/api/models/response';
import { ItemSource } from '@app/models/itemSource';

@Injectable()
export class ItemService {

  private itemUrl = environment.apiUrl + "/items";

  constructor(
    private client: RequestClient
  ) { }

  getAllItems(page: number): Observable<Response<Item>> {
    return this.client.request(this.itemUrl).page(page).order('name', 'asc').get();
  }

  getItems(name: string, tags: string[], page: number): Observable<Response<Item>> {
    return this.client.request(this.itemUrl).parameter("name", name).parameter("tags", tags).page(page).order('name', 'asc').get();
  }

  getItemSources(itemId: number): Observable<Response<ItemSource>> {
    return this.client.request(this.itemUrl + "/" + itemId + "/sources").get();
  }

}
