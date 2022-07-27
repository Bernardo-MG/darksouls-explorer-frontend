import { Component, Input } from '@angular/core';
import { Weapon } from '@app/item/models/weapon';

@Component({
  selector: 'weapon-stats',
  templateUrl: './weapon-stats.component.html',
  styleUrls: ['./weapon-stats.component.sass']
})
export class WeaponStatsComponent {

  @Input() data: Weapon = new Weapon();

  constructor() { }

}
