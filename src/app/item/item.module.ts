import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ItemGraphModule } from '@app/item-graph/item-graph.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemInfoComponent } from './components/item-info/item-info.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemSearchComponent } from './components/item-search/item-search.component';

@NgModule({
  declarations: [
    ItemInfoComponent,
    ItemListComponent,
    ItemSearchComponent
  ],
  imports: [
    CommonModule,
    ApiUiModule,
    FormsModule,
    ReactiveFormsModule,
    ItemGraphModule,
    FontAwesomeModule
  ],
  exports: [
    ItemInfoComponent,
    ItemListComponent,
    ItemSearchComponent
  ]
})
export class ItemModule { }
