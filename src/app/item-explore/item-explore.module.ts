import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemService } from './services/item.service';

@NgModule({
  declarations: [
    ItemInfoComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ItemService
  ]
})
export class ItemExploreModule { }
