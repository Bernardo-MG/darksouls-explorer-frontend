import { ActivatedRoute, Router } from "@angular/router";
import { Paginator } from "@app/api/pagination/handlers/paginator";
import { RoutePaginator } from "@app/api/pagination/handlers/route-paginator";
import { Response } from '@app/api/request/models/response';
import { Item } from "@app/models/item";
import { Observable } from "rxjs";

export class QueryHandler {

  public paginator: Paginator;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private read: (page: number) => Observable<Response<any>>
  ) {
    this.paginator = new RoutePaginator(router);

    route.queryParamMap.subscribe(params => {
      let pageNumber;
      if (params.has('page')) {
        pageNumber = Number(params.get('page'));
      } else {
        pageNumber = 0;
      }

      this.read(pageNumber).subscribe(r => this.handleResponse(r));
    });
  }

  private handleResponse(response: Response<Item[]>) {
    this.paginator.setPagination(response);
  }

}