import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { WeaponProgressionPath } from '@app/item/models/weaponProgressionPath';
import { WeaponProgressionLevel } from '@app/item/models/weaponProgressionLevel';
import { LineSelection } from '../models/line-selector';

@Component({
  selector: 'weapon-paths',
  templateUrl: './weapon-paths.component.html',
  styleUrls: ['./weapon-paths.component.sass']
})
export class WeaponPathsComponent implements OnChanges {

  @Input() stats: WeaponProgression = new WeaponProgression();

  selectedDamage: Boolean = false;
  selectedDefense: Boolean = false;

  selectedPath: WeaponProgressionPath = new WeaponProgressionPath();

  selectors: LineSelection[] = [];

  maxLevel: number = 0;

  constructor() {
    this.loadDamageSelectors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.maxLevel = this.getMaxLevel(this.stats.paths);
  }

  selectPath(path: WeaponProgressionPath): void {
    this.selectedPath = path;
  }

  loadDamageSelectors() {
    this.selectors = this.getDamageSelectors();
    this.selectedDamage = true;
    this.selectedDefense = false;
  }

  loadDefenseSelectors() {
    this.selectors = this.getDefenseSelectors();
    this.selectedDamage = false;
    this.selectedDefense = true;
  }

  private getDamageSelectors(): LineSelection[] {
    const selects: LineSelection[] = [];

    selects.push({ name: 'Fire', selector: (level: WeaponProgressionLevel) => level.damage.fire });
    selects.push({ name: 'Lightning', selector: (level: WeaponProgressionLevel) => level.damage.lightning });
    selects.push({ name: 'Magic', selector: (level: WeaponProgressionLevel) => level.damage.magic });
    selects.push({ name: 'Physical', selector: (level: WeaponProgressionLevel) => level.damage.physical });

    return selects;
  }

  private getDefenseSelectors(): LineSelection[] {
    const selects: LineSelection[] = [];
    
    selects.push({ name: 'Fire', selector: (level: WeaponProgressionLevel) => level.damageReduction.fire });
    selects.push({ name: 'Lightning', selector: (level: WeaponProgressionLevel) => level.damageReduction.lightning });
    selects.push({ name: 'Magic', selector: (level: WeaponProgressionLevel) => level.damageReduction.magic });
    selects.push({ name: 'Physical', selector: (level: WeaponProgressionLevel) => level.damageReduction.physical });

    return selects;
  }

  private getMaxLevel(paths: WeaponProgressionPath[]): number {
    let maxLevel = 0;
    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      let pathMax = path.levels[path.levels.length - 1].pathLevel;
      if (pathMax > maxLevel) {
        maxLevel = pathMax;
      }
    }

    return maxLevel;
  }

}
