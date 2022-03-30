import { Component, Input, OnInit } from '@angular/core';
import { WeaponProgression } from '@app/models/weaponProgression';
import { WeaponProgressionPathLevel } from '@app/models/weaponProgressionPathLevel';
import { LineSelection } from '../models/line-selector';

@Component({
  selector: 'weapon-path-defense',
  templateUrl: './weapon-path-defense.component.html',
  styleUrls: ['./weapon-path-defense.component.sass']
})
export class WeaponPathDefenseComponent implements OnInit {

  @Input() stats: WeaponProgression = { weapon: '', paths: [] };

  selectors: LineSelection[] = [];

  constructor() { }

  ngOnInit(): void {
    this.selectors.push({ name: 'Fire', selector: (level: WeaponProgressionPathLevel) => level.fireReduction });
    this.selectors.push({ name: 'Lightning', selector: (level: WeaponProgressionPathLevel) => level.lightningReduction });
    this.selectors.push({ name: 'Magic', selector: (level: WeaponProgressionPathLevel) => level.magicReduction });
    this.selectors.push({ name: 'Physical', selector: (level: WeaponProgressionPathLevel) => level.physicalReduction });
  }

}
