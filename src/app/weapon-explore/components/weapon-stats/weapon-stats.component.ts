import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Weapon } from '@app/item/models/weapon';
import { WeaponProgressionLevel } from '@app/item/models/weaponProgressionLevel';

@Component({
  selector: 'weapon-stats',
  templateUrl: './weapon-stats.component.html',
  styleUrls: ['./weapon-stats.component.sass']
})
export class WeaponStatsComponent implements OnChanges {

  @Input() weapon: Weapon = new Weapon();

  @Input() level: WeaponProgressionLevel = new WeaponProgressionLevel();

  @Input() levels: number[] = [];

  @Input() selectedLevel: number = -1;

  @Output() selectLevel = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.levels.length > 0) {
      this.selectedLevel = this.levels[0];
      this.selectLevel.emit(this.selectedLevel);
    }
  }

  changeLevel(e: any) {
    this.selectLevel.emit(Number(e.target.value));
  }

}
