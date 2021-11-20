import { Component, OnInit } from '@angular/core';
import { Item } from '@app/models/Item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.sass']
})
export class ItemViewComponent implements OnInit {

  items: Item[] = [];

  selected: Item = { name: '', description: [] }

  page: number = 0;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.getItems(this.page).subscribe(data => this.items = data.content);
  }

  selectItem(data: Item) {
    this.selected = data;
  }

  loadNextPage() {
    this.page += 1;
    this.itemService.getItems(this.page).subscribe(data => this.items = this.items.concat(data.content));
  }

}
