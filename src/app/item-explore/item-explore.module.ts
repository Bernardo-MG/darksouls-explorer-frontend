import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ItemGraphModule } from '@app/item-graph/item-graph.module';
import { ItemModule } from '@app/item/item.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemExploreRoutingModule } from './item-explore-routing.module';
import { ItemService } from './services/item.service';
import { ItemInfoViewComponent } from './views/item-info-view/item-info-view.component';
import { ItemListViewComponent } from './views/item-list-view/item-list-view.component';

@NgModule({
  declarations: [
    ItemListViewComponent,
    ItemInfoViewComponent
  ],
  imports: [
    ItemExploreRoutingModule,
    ItemModule,
    CommonModule,
    ApiUiModule,
    FormsModule,
    ReactiveFormsModule,
    ItemGraphModule,
    FontAwesomeModule
  ],
  providers: [
    ItemService
  ]
})
export class ItemExploreModule { }
