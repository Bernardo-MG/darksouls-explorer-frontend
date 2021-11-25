import { Component, OnInit } from '@angular/core';
import { Item } from '@app/models/Item';
import { Paginator } from '@app/pagination/paginator/paginator';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.sass']
})
export class ItemViewComponent implements OnInit {

  paginator: Paginator = new Paginator((page) => this.service.getItems(page));

  items: Item[] = [];

  selected: Item = { name: '', description: [] }

  page: number = 0;

  constructor(
    private service: ItemService
  ) { }

  ngOnInit(): void {
    this.paginator.init();
  }

  previousPage() {
    this.paginator.previousPage();
  }

  nextPage() {
    this.paginator.nextPage();
  }

  toPage(page: number) {
    this.paginator.toPage(page);
  }

  selectItem(data: Item) {
    this.selected = data;
  }

}
