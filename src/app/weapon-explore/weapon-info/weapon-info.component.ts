import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponProgression } from '../models/weaponProgression';

@Component({
  selector: 'weapon-info',
  templateUrl: './weapon-info.component.html',
  styleUrls: ['./weapon-info.component.sass']
})
export class WeaponInfoComponent implements OnChanges {

  @Input() stats: WeaponProgression = { weapon: '' };

  weaponTitle: string = 'Item sources';

  levels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  @Input() lines: Line[] = [
    { name: 'standard', data: [82, 90, 98, 106, 114, 123, 131, 139, 147, 155, 164, 172, 180, 188, 196, 205] },
    { name: 'raw', data: [null, null, null, null, null, 141, 150, 159, 169, 178, 188] },
    { name: 'crystal', data: [null, null, null, null, null, null, null, null, null, null, 180, 188, 196, 205, 213, 221] }
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.weaponTitle = this.stats.weapon;
  }

}
