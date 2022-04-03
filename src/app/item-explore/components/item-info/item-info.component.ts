import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Graph } from '@app/graph/models/graph';
import { ArmorProgression } from '@app/models/armorProgression';
import { Item } from '@app/models/item';
import { ItemSource } from '@app/models/itemSource';
import { WeaponProgression } from '@app/models/weaponProgression';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.sass']
})
export class ItemInfoComponent {

  @Input() data: Item = { id: -1, name: '', description: [], tags: [] };

  @Input() weaponProgression: WeaponProgression = { weapon: '', paths: [] };

  @Input() armorProgression: ArmorProgression = { armor: '', levels: [] };

  @Output() back = new EventEmitter<void>();

  @Input() sources: ItemSource[] = [];

  @Input() sourcesGraph: Graph = { nodes: [], links: [], categories: [] };

  sourcesTitle: string = "Item sources";
  
  public backIcon = faArrowLeftLong;

  constructor() { }

  goBack(): void {
    this.back.emit();
  }

}
