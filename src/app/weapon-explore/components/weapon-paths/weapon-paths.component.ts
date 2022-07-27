import { Component, Input, SimpleChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { WeaponProgressionPath } from '@app/item/models/weaponProgressionPath';
import { WeaponPathsService } from '@app/weapon-explore/services/weapon-paths.service';

@Component({
  selector: 'weapon-paths',
  templateUrl: './weapon-paths.component.html',
  styleUrls: ['./weapon-paths.component.sass']
})
export class WeaponPathsComponent {

  @Input() stats: WeaponProgression = new WeaponProgression();

  levels: string[] = [];

  damageLines: Line[] = [];

  defenseLines: Line[] = [];

  pathDamageLines: { [key: string]: Line[] } = {};

  pathDefenseLines: { [key: string]: Line[] } = {};

  selected: string = '';

  constructor(
    private service: WeaponPathsService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.levels = this.service.getLevels(this.stats.paths);
    //this.pathDamageLines = this.stats.paths.map(p => this.service.buildDamageLines(p.levels));
    for (let path of this.stats.paths) {
      const damLines = this.service.buildDamageLines(path.levels);
      const defLines = this.service.buildDefenseLines(path.levels);
      this.pathDamageLines[path.path] = damLines;
      this.pathDefenseLines[path.path] = defLines;
    }

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
