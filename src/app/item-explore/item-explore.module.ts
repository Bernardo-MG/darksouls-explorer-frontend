import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemService } from './services/item.service';
import { ItemExploreRoutingModule } from './item-explore-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemViewComponent } from './item-view/item-view.component';

@NgModule({
  declarations: [
    ItemInfoComponent,
    ItemListComponent,
    ItemViewComponent
  ],
  imports: [
    ItemExploreRoutingModule,
    CommonModule
  ],
  providers: [
    ItemService
  ]
})
export class ItemExploreModule { }
