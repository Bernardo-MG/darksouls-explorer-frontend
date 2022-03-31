import { Component, Input, OnChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponProgression } from '@app/models/weaponProgression';
import { WeaponProgressionPath } from '@app/models/weaponProgressionPath';
import { WeaponProgressionPathLevel } from '@app/models/weaponProgressionPathLevel';
import { LineSelection } from '../models/line-selector';

@Component({
  selector: 'weapon-path',
  templateUrl: './weapon-path.component.html',
  styleUrls: ['./weapon-path.component.sass']
})
export class WeaponPathComponent implements OnChanges {

  @Input() stats: WeaponProgression = { weapon: '', paths: [] };

  @Input() selectors: LineSelection[] = [];

  levels: string[] = [];

  lines: Line[] = [];

  constructor() { }

  ngOnChanges(): void {
    if (this.stats.paths.length > 0) {
      const path = this.stats.paths[0];
      this.loadPath(path);
    } else {
      this.levels = [];
    }
  }

  loadPath(path: WeaponProgressionPath): void {
    this.lines = [];

    this.lines = this.selectors.map(s => this.buildLine(path.levels, s.name, s.selector));

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

  private getMaxLevel(paths: WeaponProgressionPath[]): number {
    let maxLevel = 0;
    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      let pathMax = path.levels[path.levels.length - 1].pathLevel;
      if (pathMax > maxLevel) {
        maxLevel = pathMax;
      }
    }

    return maxLevel;
  }

  private buildLine(levels: WeaponProgressionPathLevel[], name: string, selector: (arg: WeaponProgressionPathLevel) => number): Line {
    let padding: (number | null)[];
    const values: (number | null)[] = levels.map(level => selector(level)).map(this.removeZeros);

    if (levels.length) {
      padding = this.linePadding(levels[0].pathLevel);
    } else {
      padding = [];
    }

    const data = padding.concat(values);

    return {
      name,
      data
    }
  }

  private linePadding(index: number): (number | null)[] {
    const padding = [];

    for (var i = 0; i < index; i += 1) {
      padding.push(null);
    }

    return padding;
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
