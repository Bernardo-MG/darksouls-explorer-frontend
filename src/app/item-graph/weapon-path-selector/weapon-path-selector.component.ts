import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeaponProgression } from '@app/models/weaponProgression';
import { WeaponProgressionPath } from '@app/models/weaponProgressionPath';

@Component({
  selector: 'weapon-path-selector',
  templateUrl: './weapon-path-selector.component.html',
  styleUrls: ['./weapon-path-selector.component.sass']
})
export class WeaponPathSelectorComponent {

  @Input() stats: WeaponProgression = { weapon: '', paths: [] };

  @Output() selectPath = new EventEmitter<WeaponProgressionPath>();

  selected: string = '';

  constructor() { }

  loadPath(path: WeaponProgressionPath): void {
    this.selectPath.emit(path);

    this.selected = path.path;
  }

}
