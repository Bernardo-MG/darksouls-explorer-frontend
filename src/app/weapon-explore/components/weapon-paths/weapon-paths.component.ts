import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Line } from '@app/graph/models/line';
import { WeaponProgressionPath } from '@app/item/models/weaponProgressionPath';

@Component({
  selector: 'weapon-paths',
  templateUrl: './weapon-paths.component.html',
  styleUrls: ['./weapon-paths.component.sass']
})
export class WeaponPathsComponent implements OnChanges {

  @Input() paths: WeaponProgressionPath[] = [];

  @Input() levels: string[] = [];

  @Input() pathDamageLines: { [key: string]: Line[] } = {};

  @Input() pathDefenseLines: { [key: string]: Line[] } = {};

  @Output() selectPath = new EventEmitter<string>();

  damageLines: Line[] = [];

  defenseLines: Line[] = [];

  selected: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const defaultPath = this.findDefaultPath(this.paths);
    this.select(defaultPath.path);
  }

  select(path: string): void {
    this.selected = path;
    this.damageLines = this.pathDamageLines[path];
    this.defenseLines = this.pathDefenseLines[path];
    this.selectPath.emit(path);
  }

  private findDefaultPath(paths: WeaponProgressionPath[]): WeaponProgressionPath {
    const foundDefault = paths
      .filter(p => p.levels.length)
      .find(p => p.levels[0].pathLevel == 0);
    let defaultPath: WeaponProgressionPath;
    if (foundDefault) {
      defaultPath = foundDefault;
    } else {
      defaultPath = new WeaponProgressionPath();
    }

    return defaultPath;
  }

}
