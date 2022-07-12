import { Component, Input, SimpleChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { LineSelection } from '@app/item-graph/models/line-selector';
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

  lines: Line[] = [];

  defaultPath: WeaponProgressionPath = new WeaponProgressionPath();

  selected: WeaponProgressionPath = new WeaponProgressionPath();

  selectedGroup: String = '';

  selectors: LineSelection[] = [];

  maxLevel: number = 0;

  constructor(
    private service: WeaponPathsService
  ) {
    this.loadGroup('damage');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const found = this.stats.paths.find(path => path.levels[0].pathLevel == 0);
    if (found) {
      this.defaultPath = found;
    } else {
      this.defaultPath = new WeaponProgressionPath();
    }
    this.maxLevel = this.service.getMaxLevel(this.stats.paths);

    this.select(this.defaultPath);
  }

  select(path: WeaponProgressionPath): void {
    this.selected = path;

    switch (this.selectedGroup) {
      case 'damage': {
        this.lines = this.service.buildDamageLine(path.levels);
        break;
      }
      default: {
        this.lines = this.service.buildDefenseLine(path.levels);
        break;
      }
    }

    this.levels = this.service.getLevels(this.maxLevel);
  }

  loadGroup(group: string) {
    this.selectedGroup = group;
    // Forces reload of the path for this group
    this.select(this.selected);
  }

}
