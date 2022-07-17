import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Weapon } from '@app/item/models/weapon';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { WeaponService } from '@app/weapon-explore/services/weapon.service';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weapon-info-view',
  templateUrl: './weapon-info-view.component.html',
  styleUrls: ['./weapon-info-view.component.sass']
})
export class WeaponInfoViewComponent implements OnInit {

  items: Weapon[] = [];

  data: Weapon = new Weapon();

  weaponProgression: WeaponProgression = new WeaponProgression();
  
  public backIcon = faArrowLeftLong;

  constructor(
    private service: WeaponService,
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
      this.service.getWeapon(identifier)
        .subscribe(item => {
          if (item) {
            this.data = item
          } else {
            this.data = new Weapon();
          }
        });
      this.service.getWeaponStats(identifier).subscribe(data => this.weaponProgression = data);
    }
  }

  return() {
    this.location.back();
  }

}
