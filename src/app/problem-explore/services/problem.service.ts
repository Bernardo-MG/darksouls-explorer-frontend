import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteDatasource } from '@app/api/datasource/handlers/route-datasource';
import { ApiRequest } from "@app/api/models/api-request";
import { ApiResponse } from '@app/api/models/api-response';
import { RequestClient } from '@app/api/request/handlers/request-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Problem } from '../models/Problem';

@Injectable()
export class ProblemService {

  private problemUrl = environment.apiUrl + "/problems";

  datasource: RouteDatasource<Problem>;

  constructor(
    private client: RequestClient,
    route: ActivatedRoute
  ) {
    this.datasource = new RouteDatasource<Problem>(route, (request: ApiRequest<Problem>) => this.requestProblems(request));
  }
  
  public getProblems(): Observable<Problem[]> {
    return this.datasource.data;
  }

  private requestProblems(request: ApiRequest<Problem>): Observable<ApiResponse<Problem[]>> {
    return this.client.get<Problem>(this.problemUrl).page(request.pagination).sort({ property: 'id', order: 'asc' }).fetch();
  }

}
