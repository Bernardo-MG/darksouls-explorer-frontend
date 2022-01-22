import { Component, Input, OnInit } from '@angular/core';
import { WeaponProgression } from '../models/weaponProgression';

@Component({
  selector: 'weapon-info',
  templateUrl: './weapon-info.component.html',
  styleUrls: ['./weapon-info.component.sass']
})
export class WeaponInfoComponent {

  @Input() stats: WeaponProgression = {weapon:""};
  
  constructor() { }

}
