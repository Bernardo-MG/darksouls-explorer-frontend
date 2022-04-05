import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemSearchService } from '@app/item-explore/services/item-search.service';
import { ItemService } from '@app/item-explore/services/item.service';
import { Item } from '@app/models/item';
import { ItemSearch } from '@app/models/itemSearch';
import { DefaultPaginator } from '@app/pagination/paginator/default-paginator';
import { Paginator } from '@app/pagination/paginator/paginator';
import { RoutePaginator } from '@app/pagination/paginator/route-paginator';

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

  constructor(
    private service: ItemService,
    private searchService: ItemSearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // By default it will search for all the items
    this.paginator = new DefaultPaginator((page) => this.service.getAllItems(page));
    this.routePaginator = new RoutePaginator(this.paginator, router);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if(params.has('page')){
        this.paginator.toPage(Number(params.get('page')));
      } else {
        this.paginator.toFirstPage();
      }
    });
    this.searchService.getTags().subscribe(data => this.tags = data);
  }

  selectItem(data: Item) {
    this.router.navigate([data.id], { relativeTo: this.route });
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  applySearch(search: ItemSearch) {
    this.paginator = new DefaultPaginator((page) => this.service.getItems(search.name, search.tags, page));
    this.paginator.toFirstPage();
  }

}
