import { Injectable } from '@angular/core';
import { RequestClient } from '@app/api/request/handlers/request-client';
import { RequestClientOperations } from '@app/api/request/handlers/request-client-operations';
import { PaginatedResponse } from '@app/api/request/models/paginated-response';
import { Graph } from '@app/graph/models/graph';
import { ArmorProgression } from '@app/models/armorProgression';
import { Item } from '@app/models/item';
import { ItemSearch } from '@app/models/itemSearch';
import { ItemSource } from '@app/models/itemSource';
import { WeaponProgression } from '@app/models/weaponProgression';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class ItemService {

  private itemUrl = environment.apiUrl + "/items";

  constructor(
    private client: RequestClient
  ) { }

  getAllItems(page: number): Observable<PaginatedResponse<Item[]>> {
    return this.client.get(this.itemUrl).page(page).order('name', 'asc').getResponse();
  }

  getItems(search: ItemSearch, page: number): Observable<PaginatedResponse<Item[]>> {
    const selectors = [];
    const clt: RequestClientOperations = this.client.get(this.itemUrl);

    if (search.name) {
      clt.parameter("name", search.name);
    }

    for (const [key, val] of Object.entries(search.selectors)) {
      if (val) {
        selectors.push(key);
      }
    }

    if (selectors.length) {
      clt.parameter("selectors", selectors);
    }

    return clt.parameter("search", search).page(page).order('name', 'asc').getResponse();
  }

  getItem(id: number): Observable<Item> {
    return this.client.get(this.itemUrl + `/${id}`).get();
  }

  getItemSources(itemId: number): Observable<ItemSource[]> {
    return this.client.get(this.itemUrl + "/" + itemId + "/sources").get();
  }

  getItemSourcesGraph(itemId: number): Observable<Graph> {
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

  getArmorStats(itemId: Number): Observable<ArmorProgression> {
    return this.client.get(this.itemUrl + "/" + itemId + "/levels/armors").get();
  }

  getWeaponStats(itemId: Number): Observable<WeaponProgression> {
    return this.client.get(this.itemUrl + "/" + itemId + "/levels/weapons").get();
  }

}
