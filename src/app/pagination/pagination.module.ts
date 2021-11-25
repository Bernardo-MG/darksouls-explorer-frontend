import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationNavigationComponent } from './pagination-navigation/pagination-navigation.component';



@NgModule({
  declarations: [
    PaginationNavigationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationNavigationComponent
  ]
})
export class PaginationModule { }
