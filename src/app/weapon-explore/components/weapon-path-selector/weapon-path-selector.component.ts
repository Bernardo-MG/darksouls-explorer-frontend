import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class WeaponPathSelectorComponent implements OnChanges {

  @Input() paths: WeaponProgressionPath[] = [];

  @Output() selectPath = new EventEmitter<{ lines: Line[]; levels: string[]; }>();

  selector: (levels: WeaponProgressionLevel[]) => Line[] = this.service.buildDamageLine;

  defaultPath: WeaponProgressionPath = new WeaponProgressionPath();

  selected: WeaponProgressionPath = new WeaponProgressionPath();

  selectedGroup: String = '';

  selectors: LineSelection[] = [];

  maxLevel: number = 0;

  constructor(
    private service: WeaponPathsService
  ) {
    this.loadDamageSelectors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const found = this.paths.find(path => path.levels[0].pathLevel == 0);
    if (found) {
      this.defaultPath = found;
    } else {
      this.defaultPath = new WeaponProgressionPath();
    }

    this.select(this.defaultPath);

    this.maxLevel = this.service.getMaxLevel(this.paths);
  }

  select(path: WeaponProgressionPath): void {
    this.selected = path;

    const lines = this.selector(path.levels);

    const levels = this.service.getLevels(this.maxLevel);
    this.selectPath.emit({ lines, levels });
  }

  loadDamageSelectors() {
    this.selector = (lines) => this.service.buildDamageLine(lines);
    this.selectedGroup = 'damage';
    this.select(this.selected);
  }

  loadDefenseSelectors() {
    this.selector = (lines) => this.service.buildDefenseLine(lines);
    this.selectedGroup = 'defense';
    this.select(this.selected);
  }

}
