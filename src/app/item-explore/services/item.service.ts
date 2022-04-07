import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { PaginatedRequestClient } from '@app/api/request/paginated-request-client';
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
    private client: PaginatedRequestClient
  ) { }

  getAllItems(page: number): Observable<PaginatedResponse<Item[]>> {
    return this.client.request(this.itemUrl).page(page).order('name', 'asc').getResponse();
  }

  getItems(search: ItemSearch, page: number): Observable<PaginatedResponse<Item[]>> {
    const tags = [];
    const clt: PaginatedRequestClient = this.client.request(this.itemUrl);

    if (search.name) {
      clt.parameter("name", search.name);
    }

    if (search.selectors.armor) {
      tags.push("Armor");
    } else if (search.selectors.item) {
      tags.push("Item");
    } else if (search.selectors.shield) {
      tags.push("Shield");
    } else if (search.selectors.spell) {
      tags.push("Spell");
    } else if (search.selectors.weapon) {
      tags.push("Weapon");
    }

    if (tags.length) {
      clt.parameter("tags", tags);
    }

    return clt.page(page).order('name', 'asc').getResponse();
  }

  getItem(id: number): Observable<Item> {
    return this.client.request(this.itemUrl + `/${id}`).get();
  }

  getItemSources(itemId: number): Observable<ItemSource[]> {
    return this.client.request(this.itemUrl + "/" + itemId + "/sources").get();
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
    return this.client.request(this.itemUrl + "/" + itemId + "/levels/armors").get();
  }

  getWeaponStats(itemId: Number): Observable<WeaponProgression> {
    return this.client.request(this.itemUrl + "/" + itemId + "/levels/weapons").get();
  }

}
