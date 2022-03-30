import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemGraphModule } from '@app/item-graph/item-graph.module';
import { PaginationModule } from '@app/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemExploreRoutingModule } from './item-explore-routing.module';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { ItemSearchService } from './services/item-search.service';
import { ItemService } from './services/item.service';

@NgModule({
  declarations: [
    ItemInfoComponent,
    ItemListComponent,
    ItemViewComponent,
    ItemSearchComponent
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
