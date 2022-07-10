import { Component, Input, OnChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponProgressionPath } from '@app/item/models/weaponProgressionPath';
import { WeaponProgressionLevel } from '@app/item/models/weaponProgressionLevel';
import { LineSelection } from '../models/line-selector';

@Component({
  selector: 'weapon-path',
  templateUrl: './weapon-path-chart.component.html',
  styleUrls: ['./weapon-path-chart.component.sass']
})
export class WeaponPathComponent implements OnChanges {

  @Input() selectors: LineSelection[] = [];

  @Input() path: WeaponProgressionPath = new WeaponProgressionPath();

  @Input() maxLevel: number = 0;

  levels: string[] = [];

  lines: Line[] = [];

  constructor() { }

  ngOnChanges(): void {
    this.loadPath(this.path);
  }

  loadPath(path: WeaponProgressionPath): void {
    this.lines = [];

    this.lines = this.selectors.map(s => this.buildLine(path.levels, s.name, s.selector));

    this.levels = this.getLevels(this.maxLevel);
  }

  private getLevels(maxLevel: number): string[] {
    const levels = [];
    for (let i = 0; i < maxLevel; i++) {
      levels.push(i.toString());
    }

    return levels;
  }

  private buildLine(levels: WeaponProgressionLevel[], name: string, selector: (arg: WeaponProgressionLevel) => number): Line {
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
