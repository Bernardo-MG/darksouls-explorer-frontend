import { Injectable } from '@angular/core';
import { Item } from '@app/models/item';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RequestClient } from '@app/api/request/request-client';
import { Response } from '@app/api/models/response';
import { ItemSource } from '@app/models/itemSource';
import { Graph } from '@app/graph/models/graph';
import { Map } from '@app/models/map';
import { Link } from '@app/graph/models/link';
import { Node } from '@app/graph/models/node';
import { MapConnection } from '@app/models/mapConnection';

@Injectable()
export class ItemService {

  private itemUrl = environment.apiUrl + "/items";

  private mapUrl = environment.apiUrl + "/maps";

  private mapConnectionUrl = environment.apiUrl + "/maps/connections";

  private mapGraph: Graph = { nodes: [], links: [] };

  constructor(
    private client: RequestClient
  ) {
    this.getMapGraph().subscribe((graph) => this.mapGraph = graph);
  }

  getAllItems(page: number): Observable<Response<Item>> {
    return this.client.request(this.itemUrl).page(page).order('name', 'asc').get();
  }

  getItems(name: string, tags: string[], page: number): Observable<Response<Item>> {
    return this.client.request(this.itemUrl).parameter("name", name).parameter("tags", tags).page(page).order('name', 'asc').get();
  }

  getItemSources(itemId: number): Observable<Response<ItemSource>> {
    return this.client.request(this.itemUrl + "/" + itemId + "/sources").get();
  }

  getItemSourcesGraph(itemId: number): Observable<Graph> {
    return this.getItemSources(itemId).pipe(map((sources) => {
      const itemNodes = sources.content.map((s) => { return { id: s.itemId.toString(), name: s.item, label: s.item } })
      const locationNodes = sources.content.map((s) => { return { id: s.locationId.toString(), name: s.location, label: s.location } })
      const sourceNodes = sources.content.map((s) => { return { id: s.sourceId.toString(), name: s.source, label: s.source } })
      var nodes = [...itemNodes, ...locationNodes, ...sourceNodes];
      nodes = Array.from(nodes.reduce((m, t) => m.set(t.name, t), new Map()).values());

      const itemSources = sources.content.map((s) => { return { source: s.itemId.toString(), target: s.sourceId.toString() } })
      const sourceLocations = sources.content.map((s) => { return { source: s.sourceId.toString(), target: s.locationId.toString() } })

      return { nodes: nodes, links: [...itemSources, ...sourceLocations] }
    }));
  }

  private getMapGraph(): Observable<Graph> {
    return forkJoin({ nodes: this.getAllMaps(), links: this.getAllMapConnections() })
  }

  private getAllMaps(): Observable<Node[]> {
    return this.client.request(this.mapUrl).pageSize(100).order('name', 'asc').get()
      .pipe(map((response) => (response as Response<Map>).content.map(this.toNode)));
  }

  private getAllMapConnections(): Observable<Link[]> {
    return this.client.request(this.mapConnectionUrl).pageSize(100).get()
      .pipe(map((response) => (response as Response<MapConnection>).content.map(this.toLink)));
  }

  private toNode(data: Map): Node {
    return { label: data.name, name: data.name, id: data.id.toString() };
  }

  private toLink(data: MapConnection): Link {
    return { source: data.id.toString(), target: data.connection.toString() };
  }

}
