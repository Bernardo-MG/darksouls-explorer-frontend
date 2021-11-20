import { Injectable } from '@angular/core';
import { Item } from '@app/models/Item';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { PaginationClient } from '@app/api/request/pagination-client';
import { Response } from '@app/api/models/response';

@Injectable()
export class ItemService {

  private itemUrl = environment.apiUrl + "/items";

  constructor(
    private client: PaginationClient
  ) { }

  getItems(page: number): Observable<Response<Item>> {
    return this.client.request(this.itemUrl).page(page).order('name', 'asc').get();
  }

}
