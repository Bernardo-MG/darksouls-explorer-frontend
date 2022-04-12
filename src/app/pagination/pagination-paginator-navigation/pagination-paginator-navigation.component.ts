import { Component, Input } from '@angular/core';
import { DefaultPaginationController } from '../../api/pagination/default-pagination-controller';
import { PaginationController } from '../../api/pagination/pagination-controller';

@Component({
  selector: 'pagination-paginator-navigation',
  templateUrl: './pagination-paginator-navigation.component.html',
  styleUrls: ['./pagination-paginator-navigation.component.sass']
})
export class PaginationPaginatorNavigationComponent {

  @Input() paginator: PaginationController = new DefaultPaginationController();
  
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
