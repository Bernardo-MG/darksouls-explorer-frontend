import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { WeaponProgressionPath } from '@app/item/models/weaponProgressionPath';
import { WeaponProgressionLevel } from '@app/item/models/weaponProgressionLevel';
import { LineSelection } from '../../../item-graph/models/line-selector';
import { WeaponPathsService } from '@app/weapon-explore/services/weapon-paths.service';
import { Line } from '@app/graph/models/line';

@Component({
  selector: 'weapon-paths',
  templateUrl: './weapon-paths.component.html',
  styleUrls: ['./weapon-paths.component.sass']
})
export class WeaponPathsComponent implements OnChanges {

  @Input() stats: WeaponProgression = new WeaponProgression();

  selectedDamage: Boolean = false;
  selectedDefense: Boolean = false;

  selectors: LineSelection[] = [];

  maxLevel: number = 0;

  levels: string[] = [];

  lines: Line[] = [];

  constructor(
    private service: WeaponPathsService
  ) {
    this.loadDamageSelectors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.maxLevel = this.service.getMaxLevel(this.stats.paths);
  }

  selectPath(path: WeaponProgressionPath): void {
    this.lines = [];

    this.lines = this.selectors.map(s => this.service.buildLine(path.levels, s.name, s.selector));

    this.levels = this.service.getLevels(this.maxLevel);
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
