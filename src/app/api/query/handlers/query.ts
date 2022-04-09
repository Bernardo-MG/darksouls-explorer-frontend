import { ActivatedRoute } from "@angular/router";
import { Paginator } from "@app/api/pagination/handlers/paginator";
import { Response } from '@app/api/request/models/response';
import { Item } from "@app/models/item";
import { Observable } from "rxjs";

export class QueryHandler {

    constructor(
        route: ActivatedRoute,
        private read: (page: number) => Observable<Response<any>>,
        private paginator: Paginator
    ) {
        
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