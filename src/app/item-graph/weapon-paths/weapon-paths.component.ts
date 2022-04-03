import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeaponProgression } from '@app/models/weaponProgression';
import { WeaponProgressionPath } from '@app/models/weaponProgressionPath';
import { WeaponProgressionPathLevel } from '@app/models/weaponProgressionPathLevel';
import { LineSelection } from '../models/line-selector';

@Component({
  selector: 'weapon-paths',
  templateUrl: './weapon-paths.component.html',
  styleUrls: ['./weapon-paths.component.sass']
})
export class WeaponPathsComponent implements OnChanges {

  @Input() stats: WeaponProgression = { weapon: '', paths: [] };

  selectedDamage: Boolean = false;
  selectedDefense: Boolean = false;

  selectedPath: WeaponProgressionPath = { path: '', levels: [] };

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

    selects.push({ name: 'Fire', selector: (level: WeaponProgressionPathLevel) => level.fireDamage });
    selects.push({ name: 'Lightning', selector: (level: WeaponProgressionPathLevel) => level.lightningDamage });
    selects.push({ name: 'Magic', selector: (level: WeaponProgressionPathLevel) => level.magicDamage });
    selects.push({ name: 'Physical', selector: (level: WeaponProgressionPathLevel) => level.physicalDamage });

    return selects;
  }

  private getDefenseSelectors(): LineSelection[] {
    const selects: LineSelection[] = [];
    
    selects.push({ name: 'Fire', selector: (level: WeaponProgressionPathLevel) => level.fireReduction });
    selects.push({ name: 'Lightning', selector: (level: WeaponProgressionPathLevel) => level.lightningReduction });
    selects.push({ name: 'Magic', selector: (level: WeaponProgressionPathLevel) => level.magicReduction });
    selects.push({ name: 'Physical', selector: (level: WeaponProgressionPathLevel) => level.physicalReduction });

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
