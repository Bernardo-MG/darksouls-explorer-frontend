import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemGraphModule } from '@app/item-graph/item-graph.module';
import { PaginationModule } from '@app/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemInfoComponent } from './components/item-info/item-info.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemSearchComponent } from './components/item-search/item-search.component';
import { ItemExploreRoutingModule } from './item-explore-routing.module';
import { ItemSearchService } from './services/item-search.service';
import { ItemService } from './services/item.service';
import { ItemInfoViewComponent } from './views/item-info-view/item-info-view.component';
import { ItemListViewComponent } from './views/item-list-view/item-list-view.component';

@NgModule({
  declarations: [
    ItemInfoComponent,
    ItemListComponent,
    ItemSearchComponent,
    ItemListViewComponent,
    ItemInfoViewComponent
  ],
  imports: [
    ItemExploreRoutingModule,
    CommonModule,
    PaginationModule,
    FormsModule,
    ItemGraphModule,
    FontAwesomeModule
  ],
  providers: [
    ItemService,
    ItemSearchService
  ]
})
export class ItemExploreModule { }
