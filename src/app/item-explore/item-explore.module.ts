import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemService } from './services/item.service';
import { ItemExploreRoutingModule } from './item-explore-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { PaginationModule } from '@app/pagination/pagination.module';
import { ItemSearchComponent } from './item-search/item-search.component';
import { ItemSearchService } from './services/item-search.service';
import { FormsModule } from '@angular/forms';
import { GraphModule } from '@app/graph/graph.module';
import { WeaponStatsComponent } from './weapon-stats/weapon-stats.component';

@NgModule({
  declarations: [
    ItemInfoComponent,
    ItemListComponent,
    ItemViewComponent,
    ItemSearchComponent,
    WeaponStatsComponent
  ],
  imports: [
    ItemExploreRoutingModule,
    CommonModule,
    PaginationModule,
    FormsModule,
    GraphModule
  ],
  providers: [
    ItemService,
    ItemSearchService
  ]
})
export class ItemExploreModule { }
