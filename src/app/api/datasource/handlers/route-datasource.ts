import { ActivatedRoute, Router } from "@angular/router";
import { Paginator } from "@app/api/pagination/handlers/paginator";
import { RoutePaginator } from "@app/api/pagination/handlers/route-paginator";
import { Response } from '@app/api/request/models/response';
import { Observable, tap } from "rxjs";

export class RouteDatasource<Type> {

  public paginator: Paginator;

  public data: Type[] = [];

  constructor(
    router: Router,
    route: ActivatedRoute,
    private read: (page: number, search: any) => Observable<Response<Type[]>>
  ) {
    this.paginator = new RoutePaginator(router);

    route.queryParamMap.subscribe(params => {
      let pageNumber;
      if (params.has('page')) {
        pageNumber = Number(params.get('page'));
      } else {
        pageNumber = 0;
      }

      this.read(pageNumber, undefined)
        .pipe(tap(r => this.paginator.setPagination(r)))
        .pipe(tap(r => this.data = r.content))
        .subscribe();
    });
  }

  public search(query: any){
    this.read(this.paginator.currentPage, query)
      .pipe(tap(r => this.paginator.setPagination(r)))
      .pipe(tap(r => this.data = r.content))
      .subscribe();
  }

}