import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponProgression } from '../models/weaponProgression';

@Component({
  selector: 'weapon-info',
  templateUrl: './weapon-info.component.html',
  styleUrls: ['./weapon-info.component.sass']
})
export class WeaponInfoComponent implements OnChanges {

  @Input() stats: WeaponProgression = { weapon: '', paths: [] };

  weaponTitle: string = 'Item sources';

  levels: string[] = [];

  lines: Line[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.weaponTitle = this.stats.weapon;
    this.lines = this.stats.paths.map(function (p) {
      return {
        name: p.path,
        type: 'line',
        data: p.levels.map(function (l) {
          return l.physicalDamage
        })
      };
    });
    let maxLevel = 0;
    for (let i = 0; i < this.stats.paths.length; i++) {
      let path = this.stats.paths[i];
      let pathMax = path.levels[path.levels.length - 1].level;
      if (pathMax > maxLevel) {
        maxLevel = pathMax;
      }
    }
    this.levels = [];
    for (let i = 0; i < maxLevel; i++) {
      this.levels.push(i.toString());
    }
  }

}
