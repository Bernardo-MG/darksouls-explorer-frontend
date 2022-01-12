import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '@app/models/item';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent {

  @Input() selection: Item[] = [];

  @Output() loadNextPage = new EventEmitter<Number>();

  @Output() pickOption = new EventEmitter<Item>();

  selected: number = -1;

  constructor() { }

  public select(data: Item){
    this.selected = data.id;
    this.pickOption.emit(data);
  }

}
