import { Component, Input } from '@angular/core';
import { Item } from '@app/models/Item';

@Component({
  selector: 'item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.sass']
})
export class ItemInfoComponent {

  @Input() data: Item = { name: '', description: [] };

  constructor() { }

}
