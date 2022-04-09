import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginatedResponse } from '../models/paginated-response';
import { AbstractClient } from './abstract-request-client';

@Injectable({
  providedIn: 'root'
})
export class PaginatedRequestClient extends AbstractClient {

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  public page(page: number) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('page', page);

    this.params = { params: prms };

    return this;
  }

  public pageSize(size: number) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('size', size);

    this.params = { params: prms };

    return this;
  }

  public getResponse<T>(): Observable<PaginatedResponse<T>> {
    return this.http.get<PaginatedResponse<T>>(this.url, this.params).pipe(
      map((response: PaginatedResponse<T>) => { return response })
    ).pipe(
      catchError(this.handleErrorPaged())
    );
  }

}
