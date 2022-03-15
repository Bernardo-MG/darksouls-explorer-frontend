import { Component, OnInit } from '@angular/core';
import { Item } from '@app/models/item';
import { DefaultPaginator } from '@app/pagination/paginator/default-paginator';
import { Paginator } from '@app/pagination/paginator/paginator';
import { ItemSearch } from '../models/itemSearch';
import { WeaponProgression } from '../models/weaponProgression';
import { ItemSearchService } from '../services/item-search.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.sass']
})
export class ItemViewComponent implements OnInit {

  paginator: Paginator;

  items: Item[] = [];

  selected: Item = { id: -1, name: '', description: [], tags: [] }

  stats: WeaponProgression = { weapon: "", paths: [] };

  page: number = 0;

  searchActive: boolean = false;

  tags: string[] = [];

  constructor(
    private service: ItemService,
    private searchService: ItemSearchService
  ) {
    // By default it will search for all the items
    this.paginator = new DefaultPaginator((page) => this.service.getAllItems(page));
  }

  ngOnInit(): void {
    this.paginator.firstPage();
    this.searchService.getTags().subscribe(data => this.tags = data);
  }

  selectItem(data: Item) {
    this.selected = data;
    this.service.getWeaponStats(this.selected.id).subscribe(data => this.stats = data);
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  applySearch(search: ItemSearch) {
    this.paginator = new DefaultPaginator((page) => this.service.getItems(search.name, search.tags, page));
    this.paginator.firstPage();
  }

}
