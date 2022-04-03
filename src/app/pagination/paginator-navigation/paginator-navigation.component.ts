import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { Response } from '@app/api/models/response';
import { DefaultPaginator } from '../paginator/default-paginator';
import { Paginator } from '../paginator/paginator';

@Component({
  selector: 'pagination-navigation',
  templateUrl: './paginator-navigation.component.html',
  styleUrls: ['./paginator-navigation.component.sass']
})
export class PaginatorNavigationComponent {

  @Input() paginator: Paginator = new DefaultPaginator((number) => of(new Response<any>(number)));
  
  constructor() { }

}
