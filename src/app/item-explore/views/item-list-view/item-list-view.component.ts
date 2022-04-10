import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteDatasource } from '@app/api/datasource/handlers/route-datasource';
import { DatasourceBuilder } from '@app/api/datasource/handlers/datasource-builder';
import { Paginator } from '@app/api/pagination/handlers/paginator';
import { ItemService } from '@app/item-explore/services/item.service';
import { Item } from '@app/models/item';
import { ItemSearch } from '@app/models/itemSearch';

@Component({
  selector: 'app-item-list-view',
  templateUrl: './item-list-view.component.html',
  styleUrls: ['./item-list-view.component.sass']
})
export class ItemListViewComponent {

  paginator: Paginator;

  searchActive: boolean = false;

  datasource: RouteDatasource<Item>;

  constructor(
    private service: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    datasourceBuilder: DatasourceBuilder
  ) {
    this.datasource = datasourceBuilder.build((page, search) => this.service.getItems(search, page));
    this.paginator = this.datasource.paginator;
  }

  selectItem(data: Item) {
    this.router.navigate([data.id], { relativeTo: this.route });
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  applySearch(search: ItemSearch) {
    this.datasource.search(search);
    this.searchActive = false;
  }

}
