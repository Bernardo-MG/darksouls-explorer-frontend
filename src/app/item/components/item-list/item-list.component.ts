import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Summary } from '@app/item/models/summary';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent {

  @Input() selection: Summary[] = [];

  @Output() pickOption = new EventEmitter<Summary>();

  selected: number = -1;

  constructor() { }

  public select(data: Summary){
    this.selected = data.id;
    this.pickOption.emit(data);
  }

}
