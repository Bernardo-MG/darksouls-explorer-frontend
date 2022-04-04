import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { of } from 'rxjs';
import { DefaultPaginator } from '../paginator/default-paginator';
import { Paginator } from '../paginator/paginator';

@Component({
  selector: 'pagination-route-navigation',
  templateUrl: './pagination-route-navigation.component.html',
  styleUrls: ['./pagination-route-navigation.component.sass']
})
export class PaginationRouteNavigationComponent {

  @Input() paginator: Paginator = new DefaultPaginator((number) => of(new PaginatedResponse<any>(number)));

  @Input() path: string = "";

  constructor(private router: Router) { }

  public moveToPage(page: number) {
    this.router.navigate([this.path], { queryParams: { page } });
  }

  public movePrevious(page: number) {
    this.router.navigate([this.path], { queryParams: { page: page - 1 } });
  }

  public moveNext(page: number) {
    this.router.navigate([this.path], { queryParams: { page: page + 1 } });
  }

}
