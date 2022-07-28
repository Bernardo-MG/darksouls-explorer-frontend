import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Line } from '@app/graph/models/line';
import { Weapon } from '@app/item/models/weapon';
import { WeaponProgression } from '@app/item/models/weaponProgression';
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

  weaponProgression: WeaponProgression = new WeaponProgression();

  pathDamageLines: { [key: string]: Line[] } = {};

  pathDefenseLines: { [key: string]: Line[] } = {};

  levels: string[] = [];

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

  private loadItem(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      // Request weapon
      this.service.getWeapon(identifier)
        .subscribe(item => {
          if (item) {
            this.data = item
          } else {
            this.data = new Weapon();
          }
        });
      // Request weapon stats
      this.service.getWeaponStats(identifier).subscribe(data => this.loadWeaponProgression(data));
    }
  }

  return() {
    this.location.back();
  }

  private loadWeaponProgression(data: WeaponProgression) {
    this.weaponProgression = data;
    this.levels = this.pathsService.getLevels(this.weaponProgression.paths);
    this.pathDamageLines = this.pathsService.getDamageLines(this.weaponProgression.paths);
    this.pathDefenseLines = this.pathsService.getDefenseLines(this.weaponProgression.paths);
  }

}
