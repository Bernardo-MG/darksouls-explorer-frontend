import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { DefaultPaginator } from '../paginator/default-paginator';
import { Paginator } from '../paginator/paginator';

@Component({
  selector: 'pagination-paginator-navigation',
  templateUrl: './paginator-navigation.component.html',
  styleUrls: ['./paginator-navigation.component.sass']
})
export class PaginatorNavigationComponent {

  @Input() paginator: Paginator = new DefaultPaginator((number) => of({
    content: [],
    empty: true,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      paged: false,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      unpaged: true
    },
    size: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    totalElements: 0,
    totalPages: 0
  }));
  
  constructor() { }

}
