import { Injectable } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { LineSelection } from '@app/item-graph/models/line-selector';
import { WeaponProgressionLevel } from '@app/item/models/weaponProgressionLevel';
import { WeaponProgressionPath } from '@app/item/models/weaponProgressionPath';

@Injectable()
export class WeaponPathsService {

  constructor() { }

  public getMaxLevel(paths: WeaponProgressionPath[]): number {
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

  public getLevels(maxLevel: number): string[] {
    const levels = [];
    for (let i = 0; i < maxLevel; i++) {
      levels.push(i.toString());
    }

    return levels;
  }
  
  public buildDamageLine(levels: WeaponProgressionLevel[]): Line[] {
    return this.getDamageSelectors().map(s => this.buildLine(levels, s.name, s.selector));
  }
  
  public buildDefenseLine(levels: WeaponProgressionLevel[]): Line[] {
    return this.getDefenseSelectors().map(s => this.buildLine(levels, s.name, s.selector));
  }

  private getDamageSelectors(): LineSelection[] {
    const selects: LineSelection[] = [];

    selects.push({ name: 'Fire', selector: (level: WeaponProgressionLevel) => level.damage.fire });
    selects.push({ name: 'Lightning', selector: (level: WeaponProgressionLevel) => level.damage.lightning });
    selects.push({ name: 'Magic', selector: (level: WeaponProgressionLevel) => level.damage.magic });
    selects.push({ name: 'Physical', selector: (level: WeaponProgressionLevel) => level.damage.physical });

    return selects;
  }

  private getDefenseSelectors(): LineSelection[] {
    const selects: LineSelection[] = [];

    selects.push({ name: 'Fire', selector: (level: WeaponProgressionLevel) => level.damageReduction.fire });
    selects.push({ name: 'Lightning', selector: (level: WeaponProgressionLevel) => level.damageReduction.lightning });
    selects.push({ name: 'Magic', selector: (level: WeaponProgressionLevel) => level.damageReduction.magic });
    selects.push({ name: 'Physical', selector: (level: WeaponProgressionLevel) => level.damageReduction.physical });

    return selects;
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
