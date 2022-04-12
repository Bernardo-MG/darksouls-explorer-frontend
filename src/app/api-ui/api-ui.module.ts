import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationNavigationComponent } from './pagination-navigation/pagination-navigation.component';
import { PaginationPaginatorNavigationComponent } from './pagination-controller-navigation/pagination-controller-navigation.component';



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
export class ApiUiModule { }
