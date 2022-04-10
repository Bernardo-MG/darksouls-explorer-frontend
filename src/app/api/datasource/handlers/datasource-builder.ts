import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Datasource } from "./datasource";
import { Response } from '@app/api/request/models/response';

@Injectable({
    providedIn: 'root'
})
export class DatasourceBuilder {
    
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public build(read: (page: number, search: any) => Observable<Response<any>>): Datasource {
      return new Datasource(this.router, this.route, read);
  }

}