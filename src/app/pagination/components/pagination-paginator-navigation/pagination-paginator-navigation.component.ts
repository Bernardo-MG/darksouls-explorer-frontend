import { Component, Input } from '@angular/core';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { of } from 'rxjs';
import { DefaultPaginator } from '../../handlers/default-paginator';
import { Paginator } from '../../handlers/paginator';

@Component({
  selector: 'pagination-paginator-navigation',
  templateUrl: './pagination-paginator-navigation.component.html',
  styleUrls: ['./pagination-paginator-navigation.component.sass']
})
export class PaginationPaginatorNavigationComponent {

  @Input() paginator: Paginator = new DefaultPaginator((number) => of(new PaginatedResponse<any>(number)));
  
  constructor() { }

  public moveToPage(page: number) {
    this.paginator.toPage(page);
  }

  public movePrevious(page: number) {
    this.paginator.toPreviousPage();
  }

  public moveNext(page: number) {
    this.paginator.toNextPage();
  }

}
