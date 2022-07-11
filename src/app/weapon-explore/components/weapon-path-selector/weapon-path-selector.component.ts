import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { LineSelection } from '@app/item-graph/models/line-selector';
import { WeaponProgressionLevel } from '@app/item/models/weaponProgressionLevel';
import { WeaponProgressionPath } from '@app/item/models/weaponProgressionPath';
import { WeaponPathsService } from '@app/weapon-explore/services/weapon-paths.service';

@Component({
  selector: 'weapon-path-selector',
  templateUrl: './weapon-path-selector.component.html',
  styleUrls: ['./weapon-path-selector.component.sass']
})
export class WeaponPathSelectorComponent {

  @Input() paths: WeaponProgressionPath[] = [];

  @Output() selectPath = new EventEmitter<{ lines: Line[]; levels: string[]; }>();

  selector: (levels: WeaponProgressionLevel[]) => Line[] = this.service.buildDamageLine;

  selected: string = '';

  selectedDamage: Boolean = false;
  selectedDefense: Boolean = false;

  selectors: LineSelection[] = [];

  constructor(
    private service: WeaponPathsService
  ) {
    this.loadDamageSelectors();
  }

  select(path: WeaponProgressionPath): void {
    this.selected = path.path;

    const maxLevel = this.service.getMaxLevel(this.paths);

    const lines = this.selector(path.levels);

    const levels = this.service.getLevels(maxLevel);
    this.selectPath.emit({ lines, levels });
  }

  loadDamageSelectors() {
    this.selector = (lines) => this.service.buildDamageLine(lines);
    this.selectedDamage = true;
    this.selectedDefense = false;
  }

  loadDefenseSelectors() {
    this.selector = (lines) => this.service.buildDefenseLine(lines);
    this.selectedDamage = false;
    this.selectedDefense = true;
  }

}
