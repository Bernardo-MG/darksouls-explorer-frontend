import { Component, Input } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { ArmorLevel } from '@app/models/armorLevel';
import { ArmorProgression } from '@app/models/armorProgression';

@Component({
  selector: 'app-armor-stats',
  templateUrl: './armor-stats.component.html',
  styleUrls: ['./armor-stats.component.sass']
})
export class ArmorStatsComponent {

  @Input() stats: ArmorProgression = { armor: '', levels: [] };

  levels: string[] = [];

  lines: Line[] = [];

  constructor() { }

  loadPath(): void {
    let line;
    this.lines = [];

    line = this.buildLine(this.stats.levels, 'Bleed', (level) => level.bleedProtection);
    this.lines.push(line);

    line = this.buildLine(this.stats.levels, 'Curse', (level) => level.curseProtection);
    this.lines.push(line);

    line = this.buildLine(this.stats.levels, 'Fire', (level) => level.fireProtection);
    this.lines.push(line);

    line = this.buildLine(this.stats.levels, 'Lightning', (level) => level.lightningProtection);
    this.lines.push(line);

    line = this.buildLine(this.stats.levels, 'Magic', (level) => level.magicProtection);
    this.lines.push(line);

    line = this.buildLine(this.stats.levels, 'Poison', (level) => level.poisonProtection);
    this.lines.push(line);

    line = this.buildLine(this.stats.levels, 'Regular', (level) => level.regularProtection);
    this.lines.push(line);

    line = this.buildLine(this.stats.levels, 'Slash', (level) => level.slashProtection);
    this.lines.push(line);

    line = this.buildLine(this.stats.levels, 'Strike', (level) => level.strikeProtection);
    this.lines.push(line);

    line = this.buildLine(this.stats.levels, 'Thrust', (level) => level.thrustProtection);
    this.lines.push(line);

    let maxLevel = this.stats.levels.length;
    this.levels = this.getLevels(maxLevel);
  }

  private getLevels(maxLevel: number): string[] {
    const levels = [];
    for (let i = 0; i < maxLevel; i++) {
      levels.push(i.toString());
    }

    return levels;
  }

  private buildLine(levels: ArmorLevel[], name: string, selector: (arg: ArmorLevel) => number): Line {
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
