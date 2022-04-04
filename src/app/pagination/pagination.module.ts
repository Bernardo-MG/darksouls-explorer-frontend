import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationNavigationComponent } from './pagination-navigation/pagination-navigation.component';
import { PaginationRouteNavigationComponent } from './pagination-route-navigation/pagination-route-navigation.component';
import { PaginationPaginatorNavigationComponent } from './pagination-paginator-navigation/pagination-paginator-navigation.component';



@NgModule({
  declarations: [
    PaginationNavigationComponent,
    PaginationPaginatorNavigationComponent,
    PaginationRouteNavigationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationPaginatorNavigationComponent,
    PaginationRouteNavigationComponent
  ]
})
export class PaginationModule { }
