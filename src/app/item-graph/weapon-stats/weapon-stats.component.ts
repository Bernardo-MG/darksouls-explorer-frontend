import { Component, Input, OnChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponPathProgression } from '@app/models/weaponPathProgression';
import { WeaponPathProgressionLevel } from '@app/models/weaponPathProgressionLevel';
import { WeaponProgression } from '@app/models/weaponProgression';

@Component({
  selector: 'weapon-stats',
  templateUrl: './weapon-stats.component.html',
  styleUrls: ['./weapon-stats.component.sass']
})
export class WeaponStatsComponent implements OnChanges {

  @Input() stats: WeaponProgression = { weapon: '', paths: [] };

  // TODO: split componente. The path and stats should be in two components
  path: WeaponPathProgression = { path: '', levels: [] };

  levels: string[] = [];

  lines: Line[] = [];

  constructor() { }

  ngOnChanges(): void {
    if (this.stats.paths.length > 0) {
      this.path = this.stats.paths[0];
      this.loadPath();
    }
  }

  loadPath(): void {
    let line;
    this.lines = [];

    line = this.buildLine(this.path.levels, 'Fire', (level) => level.fireDamage);
    this.lines.push(line);

    line = this.buildLine(this.path.levels, 'Lightning', (level) => level.lightningDamage);
    this.lines.push(line);

    line = this.buildLine(this.path.levels, 'Magic', (level) => level.magicDamage);
    this.lines.push(line);

    line = this.buildLine(this.path.levels, 'Physical', (level) => level.physicalDamage);
    this.lines.push(line);

    let maxLevel = this.getMaxLevel(this.stats.paths);
    this.levels = this.getLevels(maxLevel);
  }

  private getLevels(maxLevel: number): string[] {
    const levels = [];
    for (let i = 0; i < maxLevel; i++) {
      levels.push(i.toString());
    }

    return levels;
  }

  private getMaxLevel(paths: WeaponPathProgression[]): number {
    let maxLevel = 0;
    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      let pathMax = path.levels[path.levels.length - 1].level;
      if (pathMax > maxLevel) {
        maxLevel = pathMax;
      }
    }

    return maxLevel;
  }

  private buildLine(levels: WeaponPathProgressionLevel[], name: string, selector: (arg: WeaponPathProgressionLevel) => number): Line {
    const data = levels.map(level => selector(level)).map(this.removeZeros);

    return {
      name,
      data
    }
  }

  private removeZeros(value: number): number | null {
    let result: number | null;

    if (value == 0) {
      result = null;
    } else {
      result = value;
    }

    return result;
  }

}
