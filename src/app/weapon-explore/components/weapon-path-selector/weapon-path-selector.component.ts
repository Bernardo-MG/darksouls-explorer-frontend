import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { LineSelection } from '@app/item-graph/models/line-selector';
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

    const lines = this.selectors.map(s => this.service.buildLine(path.levels, s.name, s.selector));

    const levels = this.service.getLevels(maxLevel);
    this.selectPath.emit({ lines, levels });
  }

  loadDamageSelectors() {
    this.selectors = this.service.getDamageSelectors();
    this.selectedDamage = true;
    this.selectedDefense = false;
  }

  loadDefenseSelectors() {
    this.selectors = this.service.getDefenseSelectors();
    this.selectedDamage = false;
    this.selectedDefense = true;
  }

}
