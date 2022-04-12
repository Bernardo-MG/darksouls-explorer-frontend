import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Endpoint } from "@app/api/models/endpoint";
import { RouteDatasource } from "./route-datasource";

@Injectable({
    providedIn: 'root'
})
export class DatasourceBuilder {
    
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public build<T>(endpoint: Endpoint<T>): RouteDatasource<T> {
      return new RouteDatasource(this.router, this.route, endpoint);
  }

}