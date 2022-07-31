import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteDatasource } from '@app/api/datasource/route-datasource';
import { ApiRequest } from "@app/api/models/api-request";
import { ApiResponse } from '@app/api/models/api-response';
import { PageInfo } from '@app/api/models/page-info';
import { Sort } from '@app/api/models/sort';
import { GetOperations } from '@app/api/request/get-operations';
import { RequestClient } from '@app/api/request/request-client';
import { ItemSearch } from '@app/item/models/itemSearch';
import { Summary } from '@app/item/models/summary';
import { Weapon } from '@app/item/models/weapon';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class WeaponService {

  private itemUrl = environment.apiUrl + "/weapons";

  datasource: RouteDatasource<Summary>;

  constructor(
    private client: RequestClient,
    route: ActivatedRoute
  ) {
    this.datasource = new RouteDatasource<Summary>(route, (request: ApiRequest<Summary>) => this.requestWeapons(request));
  }

  public getWeapons(): Observable<Summary[]> {
    return this.datasource.data;
  }

  public getWeaponsPageInfo(): Observable<PageInfo> {
    return this.datasource.pageInfo;
  }

  public searchWeapons(search: ItemSearch | undefined) {
    this.datasource.fetch(search);
  }

  public getWeapon(id: number): Observable<Weapon> {
    return this.client.get<Weapon>(this.itemUrl + `/${id}`).fetchOneUnwrapped();
  }

  public getWeaponStats(itemId: Number): Observable<WeaponProgression> {
    return this.client.get<WeaponProgression>(this.itemUrl + "/" + itemId + "/progression").fetchOneUnwrapped();
  }

  private requestWeapons(request: ApiRequest<Summary>): Observable<ApiResponse<Summary[]>> {
    const selectors = [];
    const clt: GetOperations<Summary> = this.client.get(this.itemUrl);

    if (request.search) {
      if (request.search.name) {
        clt.parameter("name", request.search.name);
      }

      for (const [key, val] of Object.entries(request.search.selectors)) {
        if (val) {
          selectors.push(key);
        }
      }

      if (selectors.length) {
        clt.parameter("selectors", selectors);
      }
    }

    let sort: Sort<Summary>;
    if(request.sort) {
      sort = request.sort;
    } else {
      sort = { property: 'name', order: 'asc' };
    }

    return clt.page(request.pagination).sort(sort).fetch();
  }

}
