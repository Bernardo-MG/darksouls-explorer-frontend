import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationNavigationComponent } from './components/pagination-navigation/pagination-navigation.component';
import { PaginationPaginatorNavigationComponent } from './components/pagination-paginator-navigation/pagination-paginator-navigation.component';



@NgModule({
  declarations: [
    PaginationNavigationComponent,
    PaginationPaginatorNavigationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationPaginatorNavigationComponent
  ]
})
export class PaginationModule { }
