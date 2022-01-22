import { Component, OnInit } from '@angular/core';
import { WeaponProgression } from '../models/weaponProgression';
import { WeaponService } from '../services/weapon.service';

@Component({
  selector: 'app-weapon-view',
  templateUrl: './weapon-view.component.html',
  styleUrls: ['./weapon-view.component.sass']
})
export class WeaponViewComponent implements OnInit {

  data: WeaponProgression = {weapon:""};

  constructor(
    private service: WeaponService
  ) { }

  ngOnInit(): void {
    this.service.getWeaponStats(1).subscribe(data => this.data = data);
  }

}
