import { ActivatedRoute, Router } from "@angular/router";
import { Endpoint } from "@app/api/models/endpoint";
import { Pagination } from "@app/api/models/pagination";
import { Paginator } from "@app/api/pagination/handlers/paginator";
import { RoutePaginator } from "@app/api/pagination/handlers/route-paginator";
import { ReplaySubject, tap } from "rxjs";
import { Request } from '@app/api/models/request';

export class RouteDatasource<T> {

  public paginator: Paginator;

  public data = new ReplaySubject<T[]>();

  constructor(
    router: Router,
    route: ActivatedRoute,
    private endpoint: Endpoint<T>
  ) {
    this.paginator = new RoutePaginator(router);

    // Initialized with route parameters
    route.queryParamMap.subscribe(params => {
      let pageNumber;
      if (params.has('page')) {
        pageNumber = Number(params.get('page'));
      } else {
        pageNumber = 0;
      }

      this.paginator.currentPage = pageNumber;

      this.fetch(undefined);
    });
  }

  public fetch(query: any) {
    const page: Pagination = {
      page: this.paginator.currentPage,
      size: 20
    }
    const request: Request<T> = {
      pagination: page,
      search: query
    }
    this.endpoint(request)
      .pipe(tap(r => this.paginator.setPagination(r)))
      .pipe(tap(r => this.data.next(r.content)))
      .subscribe();
  }

}