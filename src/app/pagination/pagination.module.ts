import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationNavigationComponent } from './pagination-navigation/pagination-navigation.component';
import { PaginatorNavigationComponent } from './paginator-navigation/paginator-navigation.component';



@NgModule({
  declarations: [
    PaginationNavigationComponent,
    PaginatorNavigationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginatorNavigationComponent
  ]
})
export class PaginationModule { }
