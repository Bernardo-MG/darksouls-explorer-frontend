import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from '@app/api/pagination/handlers/paginator';
import { RoutePaginator } from '@app/api/pagination/handlers/route-paginator';
import { Response } from '@app/api/request/models/response';
import { ItemService } from '@app/item-explore/services/item.service';
import { Item } from '@app/models/item';
import { ItemSearch } from '@app/models/itemSearch';
import { Observable } from 'rxjs';

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

    route.queryParamMap.subscribe(params => {
      if (params.has('page')) {
        const pageNumber = Number(params.get('page'));
        this.paginator.currentPage = pageNumber;
      } else {
        this.paginator.currentPage = 0;
      }

      this.getItems(this.paginator.currentPage).subscribe(r => this.handleResponse(r));
    });
  }

  private handleResponse(response: Response<Item[]>){
    this.data = response.content;
    this.paginator.setPagination(response);
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
    let data: Observable<Response<Item[]>>;

    if (this.itemSearch) {
      data = this.service.getItems(this.itemSearch, page);
    } else {
      data = this.service.getAllItems(page);
    }

    return data;
  }

}
