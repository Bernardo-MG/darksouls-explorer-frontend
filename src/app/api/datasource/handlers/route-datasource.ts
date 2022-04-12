import { ActivatedRoute } from "@angular/router";
import { ApiRequest } from '@app/api/models/api-request';
import { Endpoint } from "@app/api/models/endpoint";
import { PageInfo } from "@app/api/models/page-info";
import { Pagination } from "@app/api/models/pagination";
import { ReplaySubject, tap } from "rxjs";

export class RouteDatasource<T> {

  public data = new ReplaySubject<T[]>();
  
  public pageInfo = new ReplaySubject<PageInfo>();

  private currentPage: number = 0;

  constructor(
    route: ActivatedRoute,
    private endpoint: Endpoint<T>
  ) {

    // Initialized with route parameters
    route.queryParamMap.subscribe(params => {
      let pageNumber;
      if (params.has('page')) {
        pageNumber = Number(params.get('page'));
      } else {
        pageNumber = 0;
      }

      this.currentPage = pageNumber;
      this.fetch(undefined);
    });
  }

  public fetch(query: any) {
    const page: Pagination = {
      page: this.currentPage,
      size: 20
    }

    const request: ApiRequest<T> = {
      pagination: page,
      search: query
    }

    this.endpoint(request)
      .pipe(tap(r => this.data.next(r.content)))
      .pipe(tap(r => this.pageInfo.next(r)))
      .subscribe();
  }

}