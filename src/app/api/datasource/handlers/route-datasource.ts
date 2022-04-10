import { ActivatedRoute, Router } from "@angular/router";
import { Endpoint } from "@app/api/models/endpoint";
import { Paginator } from "@app/api/pagination/handlers/paginator";
import { RoutePaginator } from "@app/api/pagination/handlers/route-paginator";
import { ReplaySubject, tap } from "rxjs";

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
    this.endpoint(this.paginator.currentPage, query)
      .pipe(tap(r => this.paginator.setPagination(r)))
      .pipe(tap(r => this.data.next(r.content)))
      .subscribe();
  }

}