import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { ItemSearchService } from '@app/item-explore/services/item-search.service';
import { ItemService } from '@app/item-explore/services/item.service';
import { Item } from '@app/models/item';
import { ItemSearch } from '@app/models/itemSearch';
import { DefaultPaginator } from '@app/pagination/paginator/default-paginator';
import { Paginator } from '@app/pagination/paginator/paginator';
import { RoutePaginator } from '@app/pagination/paginator/route-paginator';
import { dataTool } from 'echarts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list-view',
  templateUrl: './item-list-view.component.html',
  styleUrls: ['./item-list-view.component.sass']
})
export class ItemListViewComponent implements OnInit {

  paginator: Paginator;

  routePaginator: Paginator;

  items: Item[] = [];

  page: number = 0;

  searchActive: boolean = false;

  tags: string[] = [];

  private itemSearch: ItemSearch | undefined = undefined;

  constructor(
    private service: ItemService,
    private searchService: ItemSearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // By default it will search for all the items
    this.paginator = new DefaultPaginator((page) => this.getItems(page));
    this.routePaginator = new RoutePaginator(this.paginator, router, route);
  }

  ngOnInit(): void {
    this.searchService.getTags().subscribe(data => this.tags = data);
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

  private getItems(page: number): Observable<PaginatedResponse<Item[]>> {
    let data: Observable<PaginatedResponse<Item[]>>;

    if(this.itemSearch){
      data = this.service.getItems(this.itemSearch.name, this.itemSearch.tags, page);
    } else {
      data = this.service.getAllItems(page);
    }

    return data;
  }

}
