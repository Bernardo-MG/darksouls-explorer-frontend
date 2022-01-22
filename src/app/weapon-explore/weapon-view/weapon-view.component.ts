import { Component, OnInit } from '@angular/core';
import { Item } from '@app/models/item';
import { DefaultPaginator } from '@app/pagination/paginator/default-paginator';
import { Paginator } from '@app/pagination/paginator/paginator';
import { WeaponProgression } from '../models/weaponProgression';
import { WeaponService } from '../services/weapon.service';

@Component({
  selector: 'app-weapon-view',
  templateUrl: './weapon-view.component.html',
  styleUrls: ['./weapon-view.component.sass']
})
export class WeaponViewComponent implements OnInit {

  paginator: Paginator;

  stats: WeaponProgression = {weapon:""};

  selected: Item = { id: -1, name: '', description: [], tags: [] }

  constructor(
    private service: WeaponService
  ) {
    // By default it will search for all the items
    this.paginator = new DefaultPaginator((page) => this.service.getAllWeapons(page));
  }

  ngOnInit(): void {
    this.paginator.firstPage();
  }

  selectWeapon(data: Item) {
    this.selected = data;
    this.service.getWeaponStats(this.selected.id).subscribe(data => this.stats = data);
  }

}
