import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '@app/models/item';

@Component({
  selector: 'weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.sass']
})
export class WeaponListComponent {

  @Input() selection: Item[] = [];

  @Output() pickOption = new EventEmitter<Item>();

  selected: number = -1;

  constructor() { }

  public select(data: Item){
    this.selected = data.id;
    this.pickOption.emit(data);
  }

}
