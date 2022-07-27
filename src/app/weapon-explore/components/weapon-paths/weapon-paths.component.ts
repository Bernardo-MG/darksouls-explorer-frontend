import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { WeaponProgressionPath } from '@app/item/models/weaponProgressionPath';

@Component({
  selector: 'weapon-paths',
  templateUrl: './weapon-paths.component.html',
  styleUrls: ['./weapon-paths.component.sass']
})
export class WeaponPathsComponent implements OnChanges {

  @Input() stats: WeaponProgression = new WeaponProgression();

  @Input() levels: string[] = [];

  @Input() pathDamageLines: { [key: string]: Line[] } = {};

  @Input() pathDefenseLines: { [key: string]: Line[] } = {};

  damageLines: Line[] = [];

  defenseLines: Line[] = [];

  selected: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const defaultPath = this.findDefaultPath(this.stats.paths);
    this.select(defaultPath.path);
  }

  select(path: string): void {
    this.selected = path;
    this.damageLines = this.pathDamageLines[path];
    this.defenseLines = this.pathDefenseLines[path];
  }

  private findDefaultPath(paths: WeaponProgressionPath[]): WeaponProgressionPath {
    const foundDefault = paths
      .filter(p => p.levels.length)
      .find(p => p.levels[0].pathLevel == 0);
    let defaultPath: WeaponProgressionPath;
    if (foundDefault) {
      defaultPath = foundDefault;
    } else {
      defaultPath = new WeaponProgressionPath();
    }

    return defaultPath;
  }

}
