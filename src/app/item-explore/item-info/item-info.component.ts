import { Component, OnInit } from '@angular/core';
import { ItemService } from '@app/api/services/item.service';
import { Item } from '@app/models/Item';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.sass']
})
export class ItemInfoComponent implements OnInit {

  items: Item[] = [];

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.getItems("").subscribe(data => this.items = data);
  }

}
