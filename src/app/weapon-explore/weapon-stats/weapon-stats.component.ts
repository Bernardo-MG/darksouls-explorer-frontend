import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponPathProgression } from '../models/weaponPathProgression';
import { WeaponProgression } from '../models/weaponProgression';

@Component({
  selector: 'weapon-stats',
  templateUrl: './weapon-stats.component.html',
  styleUrls: ['./weapon-stats.component.sass']
})
export class WeaponStatsComponent implements OnChanges {

  @Input() stats: WeaponProgression = { weapon: '', paths: [] };

  @Input() weaponTitle: string = 'Weapon stats';

  path: WeaponPathProgression = { path: '', levels: [] };

  levels: string[] = [];

  lines: Line[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPath();
  }

  loadPath(): void {
    this.weaponTitle = this.stats.weapon;

    let line;
    let values;
    this.lines = [];

    values = this.path.levels.map(level => this.removeEmpty(level.fireDamage));
    line = {
      name: 'Fire',
      data: values
    }
    this.lines.push(line);

    values = this.path.levels.map(level => this.removeEmpty(level.lightningDamage));
    line = {
      name: 'Lightning',
      data: values
    }
    this.lines.push(line);

    values = this.path.levels.map(level => this.removeEmpty(level.magicDamage));
    line = {
      name: 'Magic',
      data: values
    }
    this.lines.push(line);

    values = this.path.levels.map(level => this.removeEmpty(level.physicalDamage));
    line = {
      name: 'Physical',
      data: values
    }
    this.lines.push(line);

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

  private removeEmpty(value: number): number | null{
    let result: number | null;

    if(value == 0){
      result = null;
    } else {
      result = value;
    }

    return result;
  }

}
