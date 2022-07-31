import { Injectable } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { LineSelection } from '@app/item-graph/models/line-selector';
import { WeaponProgressionLevel } from '@app/item/models/weaponProgressionLevel';
import { WeaponProgressionPath } from '@app/item/models/weaponProgressionPath';

@Injectable()
export class WeaponPathsService {

  constructor() { }

  public getLevels(paths: WeaponProgressionPath[]): string[] {
    const maxLevel = this.getMaxLevel(paths);
    const levels = [];
    for (let i = 0; i <= maxLevel; i++) {
      levels.push(i.toString());
    }

    return levels;
  }

  public getPathLevels(path: WeaponProgressionPath): number[] {
    return path.levels.map(l => l.pathLevel);
  }

  public getDamageLines(paths: WeaponProgressionPath[]): { [key: string]: Line[] } {
    const lines: { [key: string]: Line[] } = {};

    for (let path of paths) {
      const damLines = this.getPathDamageLines(path.levels);
      lines[path.path] = damLines;
    }

    return lines;
  }

  public getDefenseLines(paths: WeaponProgressionPath[]): { [key: string]: Line[] } {
    const lines: { [key: string]: Line[] } = {};

    for (let path of paths) {
      const damLines = this.getPathDefenseLines(path.levels);
      lines[path.path] = damLines;
    }

    return lines;
  }

  private getPathDamageLines(levels: WeaponProgressionLevel[]): Line[] {
    return this.getDamageSelectors().map(s => this.buildLine(levels, s.name, s.selector));
  }

  private getPathDefenseLines(levels: WeaponProgressionLevel[]): Line[] {
    return this.getDefenseSelectors().map(s => this.buildLine(levels, s.name, s.selector));
  }

  private getMaxLevel(paths: WeaponProgressionPath[]): number {
    // Takes all the level values
    const levels = paths
      .flatMap(p => p.levels)
      .map(l => l.level);
    // Finds the max level
    return Math.max(...levels);
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
    let data: (number | null)[];

    if (levels.length) {
      // Maps levels to values
      const values = levels
        .map(level => selector(level))
        .map(this.removeZeros);
      // Adds padding
      data = this.addPadding(levels[0].pathLevel, values);
    } else {
      data = [];
    }

    return {
      name,
      data
    }
  }

  private addPadding(level: number, values: (number | null)[]): (number | null)[] {
    let padding = this.linePadding(level);

    return padding.concat(values);
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
