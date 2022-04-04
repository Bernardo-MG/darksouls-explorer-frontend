import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { PaginatedRequestClient } from '@app/api/request/paginated-request-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Problem } from '../models/Problem';

@Injectable()
export class ProblemService {

  private problemUrl = environment.apiUrl + "/problems";

  constructor(
    private client: PaginatedRequestClient
  ) { }

  getProblems(page: number): Observable<PaginatedResponse<Problem>> {
    return this.client.request(this.problemUrl).page(page).order('id', 'asc').getResponse();
  }

}
