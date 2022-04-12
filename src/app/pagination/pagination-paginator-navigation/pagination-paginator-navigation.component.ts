import { Component, Input } from '@angular/core';
import { PaginationController } from '../../api/pagination/pagination-controller';

@Component({
  selector: 'pagination-paginator-navigation',
  templateUrl: './pagination-paginator-navigation.component.html',
  styleUrls: ['./pagination-paginator-navigation.component.sass']
})
export class PaginationPaginatorNavigationComponent {

  @Input() paginator: PaginationController = new PaginationController();
  
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
