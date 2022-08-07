import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Line } from '@app/graph/models/line';
import { Weapon } from '@app/item/models/weapon';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { WeaponProgressionLevel } from '@app/item/models/weaponProgressionLevel';
import { WeaponPathsService } from '@app/weapon-explore/services/weapon-paths.service';
import { WeaponService } from '@app/weapon-explore/services/weapon.service';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weapon-info-view',
  templateUrl: './weapon-info-view.component.html',
  styleUrls: ['./weapon-info-view.component.sass']
})
export class WeaponInfoViewComponent implements OnInit {

  data: Weapon = new Weapon();

  progressionLevel: WeaponProgressionLevel = new WeaponProgressionLevel();

  weaponProgression: WeaponProgression = new WeaponProgression();

  pathDamageLines: { [key: string]: Line[] } = {};

  pathDefenseLines: { [key: string]: Line[] } = {};

  levels: string[] = [];

  pathLevels: number[] = [];

  pathName: string = '';

  level: number = 0;

  public backIcon = faArrowLeftLong;

  constructor(
    private service: WeaponService,
    private pathsService: WeaponPathsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadItem(params.get('id'));
    });
  }

  return() {
    this.location.back();
  }

  changeStatsLevel(level: number): void {
    this.level = level;
    this.selectProgressionLevel();
  }

  selectPath(path: string): void {
    this.pathName = path;
    this.level = 0;
    this.selectProgressionLevel();
  }

  private loadItem(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      // Request weapon
      this.service.getWeapon(identifier).subscribe(weapon => this.loadWeapon(weapon));
      // Request weapon stats
      this.service.getWeaponStats(identifier).subscribe(data => this.loadWeaponProgression(data));
    }
  }

  private selectProgressionLevel() {
    const foundPath = this.weaponProgression.paths.find(p => p.path === this.pathName);
    if (foundPath && foundPath.levels.length > 0) {
      const foundLevel = foundPath.levels.find(l => l.pathLevel === this.level);
      if (foundLevel) {
        this.progressionLevel = foundLevel;
      } else {
        this.progressionLevel = new WeaponProgressionLevel();
      }
      this.pathLevels = this.pathsService.getPathLevels(foundPath);
    } else {
      this.progressionLevel = new WeaponProgressionLevel();
      this.pathLevels = [];
    }
  }

  private loadWeapon(weapon: Weapon) {
    if (weapon) {
      this.data = weapon;
    } else {
      this.data = new Weapon();
    }
  }

  private loadWeaponProgression(progresion: WeaponProgression) {
    if (progresion) {
      this.weaponProgression = progresion;
      this.levels = this.pathsService.getLevels(this.weaponProgression.paths);
      this.pathDamageLines = this.pathsService.getDamageLines(this.weaponProgression.paths);
      this.pathDefenseLines = this.pathsService.getDefenseLines(this.weaponProgression.paths);
      this.selectProgressionLevel();
    } else {
      this.weaponProgression = new WeaponProgression();
      this.levels = [];
      this.pathDamageLines = {};
      this.pathDefenseLines = {};
    }
  }

}
