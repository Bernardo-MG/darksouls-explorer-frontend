import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '@app/models/Item';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent {

  @Input() selection: Item[] = [];

  @Output() loadNextPage = new EventEmitter<Number>();

  @Output() select = new EventEmitter<Item>();

  constructor() { }

}
