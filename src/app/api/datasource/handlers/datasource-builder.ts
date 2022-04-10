import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { RouteDatasource } from "./route-datasource";
import { Response } from '@app/api/models/response';

@Injectable({
    providedIn: 'root'
})
export class DatasourceBuilder {
    
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public build(read: (page: number, search: any) => Observable<Response<any>>): RouteDatasource<any> {
      return new RouteDatasource(this.router, this.route, read);
  }

}