import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaginationController } from '@app/api/pagination/route-pagination-controller';
import { Item } from '@app/models/item';
import { ItemSearch } from '@app/models/itemSearch';
import { WeaponService } from '@app/weapon-explore/services/weapon.service';

@Component({
  selector: 'app-weapon-list-view',
  templateUrl: './weapon-list-view.component.html',
  styleUrls: ['./weapon-list-view.component.sass']
})
export class WeaponListViewComponent {

  searchActive: boolean = false;

  data: Item[] = [];

  constructor(
    private service: WeaponService,
    private router: Router,
    private route: ActivatedRoute,
    public paginationController: RoutePaginationController
  ) {
    this.service.getItems().subscribe(d => this.data = d);
    this.service.getItemsPageInfo().subscribe(p => paginationController.setPagination(p));
  }

  selectItem(data: Item) {
    this.router.navigate([data.id], { relativeTo: this.route });
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  applySearch(search: ItemSearch) {
    this.service.searchItems(search);
    this.searchActive = false;
  }

}
