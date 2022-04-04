import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationNavigationComponent } from './components/pagination-navigation/pagination-navigation.component';
import { PaginationRouteNavigationComponent } from './components/pagination-route-navigation/pagination-route-navigation.component';
import { PaginationPaginatorNavigationComponent } from './components/pagination-paginator-navigation/pagination-paginator-navigation.component';



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
