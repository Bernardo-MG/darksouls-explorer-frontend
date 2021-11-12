import { Injectable } from '@angular/core';
import { PaginationClient } from '@app/api/request/pagination-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Problem } from '../models/Problem';

@Injectable()
export class ProblemService {

  private problemUrl = environment.apiUrl + "/problems";

  constructor(
    private client: PaginationClient
  ) { }

  getProblems(page: number): Observable<Problem[]> {
    return this.client.request(this.problemUrl).page(page).order('id', 'asc').get();
  }

}
