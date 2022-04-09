import { Component, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from '@app/api/pagination/handlers/paginator';
import { RoutePaginator } from '@app/api/pagination/handlers/route-paginator';
import { QueryHandler } from '@app/api/query/handlers/query';
import { Response } from '@app/api/request/models/response';
import { ItemService } from '@app/item-explore/services/item.service';
import { Item } from '@app/models/item';
import { ItemSearch } from '@app/models/itemSearch';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-item-list-view',
  templateUrl: './item-list-view.component.html',
  styleUrls: ['./item-list-view.component.sass']
})
export class ItemListViewComponent {

  paginator: Paginator;

  items: Item[] = [];

  page: number = 0;

  searchActive: boolean = false;

  data: Item[] = [];

  private itemSearch: ItemSearch | undefined = undefined;

  constructor(
    private service: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // By default it will search for all the items
    this.paginator = new RoutePaginator(router);

    const query = new QueryHandler(route, (page) => this.getItems(page), this.paginator);
  }

  selectItem(data: Item) {
    this.router.navigate([data.id], { relativeTo: this.route });
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  applySearch(search: ItemSearch) {
    this.itemSearch = search;
    this.paginator.toFirstPage();
    this.searchActive = false;
  }

  private getItems(page: number): Observable<Response<Item[]>> {
    return this.service.getItems(this.itemSearch, page).pipe(tap(r => this.data = r.content));
  }

}
