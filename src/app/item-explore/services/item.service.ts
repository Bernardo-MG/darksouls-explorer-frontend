import { Injectable } from '@angular/core';
import { RequestClient } from '@app/api/request/handlers/request-client';
import { GetOperations } from '@app/api/request/handlers/get-operations';
import { Response } from '@app/api/request/models/response';
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

  getItems(search: ItemSearch | undefined, page: number): Observable<Response<Item[]>> {
    const selectors = [];
    const clt: GetOperations = this.client.get(this.itemUrl);

    if(search){
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
    }

    return clt.page(page).orderAscendingBy('name').request();
  }

  getItem(id: number): Observable<Item> {
    return this.client.get(this.itemUrl + `/${id}`).requestUnwrapped();
  }

  getItemSources(itemId: number): Observable<ItemSource[]> {
    return this.client.get(this.itemUrl + "/" + itemId + "/sources").requestUnwrapped();
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
    return this.client.get(this.itemUrl + "/" + itemId + "/levels/armors").requestUnwrapped();
  }

  getWeaponStats(itemId: Number): Observable<WeaponProgression> {
    return this.client.get(this.itemUrl + "/" + itemId + "/levels/weapons").requestUnwrapped();
  }

}
