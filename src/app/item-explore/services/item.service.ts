import { Injectable } from '@angular/core';
import { Item } from '@app/models/Item';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Response } from '@app/api/models/response';
import { PaginationClient } from '@app/api/request/pagination-client';

@Injectable()
export class ItemService {

  private itemUrl = environment.apiUrl + "/items";

  constructor(
    private client: PaginationClient
  ) { }

  getItems(page: number): Observable<Item[]> {
    return this.client.get(this.itemUrl, page);
  }

}
