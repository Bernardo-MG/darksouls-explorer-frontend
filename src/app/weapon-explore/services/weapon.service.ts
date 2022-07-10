import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteDatasource } from '@app/api/datasource/route-datasource';
import { ApiRequest } from "@app/api/models/api-request";
import { ApiResponse } from '@app/api/models/api-response';
import { PageInfo } from '@app/api/models/page-info';
import { Sort } from '@app/api/models/sort';
import { GetOperations } from '@app/api/request/get-operations';
import { RequestClient } from '@app/api/request/request-client';
import { Graph } from '@app/graph/models/graph';
import { ItemSearch } from '@app/item/models/itemSearch';
import { ItemSource } from '@app/item/models/itemSource';
import { Summary } from '@app/item/models/summary';
import { Weapon } from '@app/item/models/weapon';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class WeaponService {

  private itemUrl = environment.apiUrl + "/weapons";

  datasource: RouteDatasource<Summary>;

  constructor(
    private client: RequestClient,
    route: ActivatedRoute
  ) {
    this.datasource = new RouteDatasource<Summary>(route, (request: ApiRequest<Summary>) => this.requestItems(request));
  }

  public getItems(): Observable<Summary[]> {
    return this.datasource.data;
  }

  public getItemsPageInfo(): Observable<PageInfo> {
    return this.datasource.pageInfo;
  }

  public searchItems(search: ItemSearch | undefined) {
    this.datasource.fetch(search);
  }

  public getItem(id: number): Observable<Weapon> {
    return this.client.get<Weapon>(this.itemUrl + `/${id}`).fetchOneUnwrapped();
  }

  public getItemSources(itemId: number): Observable<ItemSource[]> {
    return this.client.get<ItemSource[]>(this.itemUrl + "/" + itemId + "/sources").fetchOneUnwrapped();
  }

  public getItemSourcesGraph(itemId: number): Observable<Graph> {
    return this.getItemSources(itemId).pipe(map((sources) => {
      const itemNodes = sources.map((s) => { return { id: s.itemId.toString(), name: s.item, label: s.item, category: 0 } })
      const sourceNodes = sources.map((s) => { return { id: s.sourceId.toString(), name: s.source, label: s.source, category: 1 } })
      const locationNodes = sources.map((s) => { return { id: s.locationId.toString(), name: s.location, label: s.location, category: 2 } })
      var nodes = [...itemNodes, ...locationNodes, ...sourceNodes];
      nodes = Array.from(nodes.reduce((m, t) => m.set(t.name, t), new Map()).values());

      const itemSources = sources.map((s) => { return { source: s.itemId.toString(), target: s.sourceId.toString() } })
      const sourceLocations = sources.map((s) => { return { source: s.sourceId.toString(), target: s.locationId.toString() } })

      return { nodes: nodes, links: [...itemSources, ...sourceLocations], categories: [{ name: 'Item' }, { name: 'Source' }, { name: 'Location' }] }
    }));
  }

  public getWeaponStats(itemId: Number): Observable<WeaponProgression> {
    return this.client.get<WeaponProgression>(this.itemUrl + "/" + itemId + "/progression").fetchOneUnwrapped();
  }

  private requestItems(request: ApiRequest<Summary>): Observable<ApiResponse<Summary[]>> {
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
