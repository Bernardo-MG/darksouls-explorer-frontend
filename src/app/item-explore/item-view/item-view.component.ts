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

  page: number = 0;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.getItems(this.page).subscribe(data => this.items = data);
  }

  loadNextPage(){
    this.page += 1;
    this.itemService.getItems(this.page).subscribe(data => this.items =  this.items.concat(data));
  }

}