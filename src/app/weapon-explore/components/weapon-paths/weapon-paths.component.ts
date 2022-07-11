import { Component, Input } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponProgression } from '@app/item/models/weaponProgression';

@Component({
  selector: 'weapon-paths',
  templateUrl: './weapon-paths.component.html',
  styleUrls: ['./weapon-paths.component.sass']
})
export class WeaponPathsComponent {

  @Input() stats: WeaponProgression = new WeaponProgression();

  levels: string[] = [];

  lines: Line[] = [];

  constructor() { }

  selectPath(path: { lines: Line[]; levels: string[]; }): void {
    this.levels = path.levels
    this.lines = path.lines
  }

}
