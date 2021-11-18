import { Injectable } from '@angular/core';
import { Item } from '@app/models/Item';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { PaginationClient } from '@app/api/request/pagination-client';

@Injectable()
export class ItemService {

  private itemUrl = environment.apiUrl + "/items";

  constructor(
    private client: PaginationClient
  ) { }

  getItems(page: number): Observable<Item[]> {
    return this.client.request(this.itemUrl).page(page).order('name', 'asc').get();
  }

}
