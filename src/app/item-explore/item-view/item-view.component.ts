import { Component, OnInit } from '@angular/core';
import { Item } from '@app/models/item';
import { DefaultPaginator } from '@app/pagination/paginator/default-paginator';
import { Paginator } from '@app/pagination/paginator/paginator';
import { ItemSearchService } from '../services/item-search.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.sass']
})
export class ItemViewComponent implements OnInit {

  paginator: Paginator = new DefaultPaginator((page) => this.service.getItems(page));

  items: Item[] = [];

  selected: Item = { id: -1, name: '', description: [], tags: [] }

  page: number = 0;

  searchActive: boolean = false;

  tags: string[] = [];

  constructor(
    private service: ItemService,
    private searchService: ItemSearchService
  ) { }

  ngOnInit(): void {
    this.paginator.firstPage();
    this.searchService.getTags().subscribe(data => this.tags = data);
  }

  selectItem(data: Item) {
    this.selected = data;
  }

  toggleSearch(){
    this.searchActive = !this.searchActive;
  }

  applySearch(tags: string[]) {
    this.paginator = new DefaultPaginator((page) => this.service.getItemsByTags(tags, page));
    this.paginator.firstPage();
  }

}
