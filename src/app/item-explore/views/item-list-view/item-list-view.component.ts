import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationController } from '@app/api/pagination/pagination-controller';
import { RoutePaginationController } from '@app/api/pagination/route-pagination-controller';
import { ItemService } from '@app/item-explore/services/item.service';
import { Item } from '@app/models/item';
import { ItemSearch } from '@app/models/itemSearch';

@Component({
  selector: 'app-item-list-view',
  templateUrl: './item-list-view.component.html',
  styleUrls: ['./item-list-view.component.sass']
})
export class ItemListViewComponent {

  searchActive: boolean = false;

  data: Item[] = [];

  paginator: PaginationController;

  constructor(
    private service: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paginator = new RoutePaginationController(router);

    this.service.getItems().subscribe(d => this.data = d);
    this.service.getItemsPageInfo().subscribe(p => this.paginator.setPagination(p));
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
