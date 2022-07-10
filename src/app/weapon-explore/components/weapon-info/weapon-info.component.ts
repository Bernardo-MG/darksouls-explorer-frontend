import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Graph } from '@app/graph/models/graph';
import { ItemSource } from '@app/item/models/itemSource';
import { Weapon } from '@app/item/models/weapon';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'weapon-info',
  templateUrl: './weapon-info.component.html',
  styleUrls: ['./weapon-info.component.sass']
})
export class WeaponInfoComponent {

  @Input() data: Weapon = new Weapon();

  @Input() weaponProgression: WeaponProgression = new WeaponProgression();

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
