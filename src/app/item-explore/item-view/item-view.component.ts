import { Component, OnInit } from '@angular/core';
import { Item } from '@app/models/item';
import { DefaultPaginator } from '@app/pagination/paginator/default-paginator';
import { Paginator } from '@app/pagination/paginator/paginator';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.sass']
})
export class ItemViewComponent implements OnInit {

  paginator: Paginator = new DefaultPaginator((page) => this.service.getItems(page));

  items: Item[] = [];

  selected: Item = { id: -1, name: '', description: [] }

  page: number = 0;

  constructor(
    private service: ItemService
  ) { }

  ngOnInit(): void {
    this.paginator.firstPage();
  }

  selectItem(data: Item) {
    this.selected = data;
  }

}
