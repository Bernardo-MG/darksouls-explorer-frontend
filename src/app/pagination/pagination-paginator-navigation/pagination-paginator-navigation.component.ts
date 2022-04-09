import { Component, Input } from '@angular/core';
import { DefaultPaginator } from '../../api/pagination/handlers/default-paginator';
import { Paginator } from '../../api/pagination/handlers/paginator';

@Component({
  selector: 'pagination-paginator-navigation',
  templateUrl: './pagination-paginator-navigation.component.html',
  styleUrls: ['./pagination-paginator-navigation.component.sass']
})
export class PaginationPaginatorNavigationComponent {

  @Input() paginator: Paginator = new DefaultPaginator();
  
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
