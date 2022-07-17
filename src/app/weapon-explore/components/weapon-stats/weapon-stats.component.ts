import { Component, Input, OnInit } from '@angular/core';
import { Weapon } from '@app/item/models/weapon';

@Component({
  selector: 'weapon-stats',
  templateUrl: './weapon-stats.component.html',
  styleUrls: ['./weapon-stats.component.sass']
})
export class WeaponStatsComponent implements OnInit {

  @Input() data: Weapon = new Weapon();
  
  constructor() { }

  ngOnInit(): void {
  }

}
