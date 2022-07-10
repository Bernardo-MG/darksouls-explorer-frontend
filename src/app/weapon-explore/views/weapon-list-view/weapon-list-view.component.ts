import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaginationController } from '@app/api/pagination/route-pagination-controller';
import { ItemSearch } from '@app/item/models/itemSearch';
import { Summary } from '@app/item/models/summary';
import { Item } from '@app/models/item';
import { WeaponService } from '@app/weapon-explore/services/weapon.service';

@Component({
  selector: 'app-weapon-list-view',
  templateUrl: './weapon-list-view.component.html',
  styleUrls: ['./weapon-list-view.component.sass']
})
export class WeaponListViewComponent {

  searchActive: boolean = false;

  data: Summary[] = [];

  constructor(
    private service: WeaponService,
    private router: Router,
    private route: ActivatedRoute,
    public paginationController: RoutePaginationController
  ) {
    this.service.getWeapons().subscribe(d => this.data = d);
    this.service.getWeaponsPageInfo().subscribe(p => paginationController.setPagination(p));
  }

  selectItem(data: Summary) {
    this.router.navigate([data.id], { relativeTo: this.route });
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  applySearch(search: ItemSearch) {
    this.service.searchWeapons(search);
    this.searchActive = false;
  }

}
