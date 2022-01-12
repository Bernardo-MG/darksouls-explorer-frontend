import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '@app/graph/models/category';
import { Graph } from '@app/graph/models/graph';
import { Item } from '@app/models/item';
import { ItemSource } from '@app/models/itemSource';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.sass']
})
export class ItemInfoComponent implements OnChanges {

  @Input() data: Item = { id: -1, name: '', description: [], tags: [] };

  sources: ItemSource[] = [];

  sourcesGraph: Graph = { nodes: [], links: [], categories: [] };

  sourcesTitle: string = "Item sources";

  constructor(
    private service: ItemService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.service.getItemSources(this.data.id).subscribe(response => this.sources = response.content);
    this.service.getItemSourcesGraph(this.data.id).subscribe(graph => this.sourcesGraph = graph);
  }

}
