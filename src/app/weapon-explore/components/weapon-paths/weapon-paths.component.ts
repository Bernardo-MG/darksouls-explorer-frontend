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

  selected: string = '';

  constructor(
    private service: WeaponPathsService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.levels = this.service.getLevels(this.stats.paths);

    const defaultPath = this.findDefaultPath();
    this.select(defaultPath);
  }

  select(path: WeaponProgressionPath): void {
    this.selected = path.path;
    this.damageLines = this.service.buildDamageLines(path.levels);
    this.defenseLines = this.service.buildDefenseLines(path.levels);
  }

  private findDefaultPath(): WeaponProgressionPath {
    const foundDefault = this.stats.paths.find(path => path.levels[0].pathLevel == 0);
    let defaultPath: WeaponProgressionPath;
    if (foundDefault) {
      defaultPath = foundDefault;
    } else {
      defaultPath = new WeaponProgressionPath();
    }

    return defaultPath;
  }

}
