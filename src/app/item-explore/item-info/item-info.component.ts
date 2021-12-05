import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  constructor(
    private service: ItemService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.service.getItemSources(this.data.id).subscribe(response => this.sources = response.content);
  }

}
