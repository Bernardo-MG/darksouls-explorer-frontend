import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RequestClient {

  params: { params?: HttpParams } = {};

  url: string = "";

  getFunc: Function;

  constructor(
    private http: HttpClient
  ) {
    this.getFunc = this.getUnpaged;
  }

  request(url: string) {
    this.params = {};

    this.url = url;
    return this;
  }

  page(page: number) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('page', page);

    this.params = { params: prms };

    this.getFunc = this.getPaged;

    return this;
  }

  pageSize(size: number) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('size', size);

    this.params = { params: prms };

    this.getFunc = this.getPaged;

    return this;
  }

  order(field: string, direction: string) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append('sort', `${field},${direction}`);

    this.params = { params: prms };

    return this;
  }

  parameter(name: string, value: any) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append(name, value);

    this.params = { params: prms };

    return this;
  }

  get<T>(): Observable<T> {
    return this.getFunc();
  }

  private getUnpaged<T>(): Observable<T> {
    return this.http.get<T>(this.url, this.params).pipe(
      map((response: T) => { return response })
    ).pipe(
      catchError(this.handleError<T>())
    );
  }

  private getPaged<T>(): Observable<Response<T[]>> {
    return this.http.get<Response<T[]>>(this.url, this.params).pipe(
      map((response: Response<T[]>) => { return response })
    ).pipe(
      catchError(this.handleErrorPaged<T>())
    );
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of();
    };
  }

  private getHttpParams() {
    let prms: HttpParams;

    if (this.params.params) {
      prms = this.params.params;
    } else {
      prms = new HttpParams();
      this.params = { params: prms };
    }

    return prms;
  }

  private handleErrorPaged<T>() {
    return (error: any): Observable<Response<T[]>> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of({
        content: [],
        empty: true,
        first: true,
        last: true,
        number: 0,
        numberOfElements: 0,
        pageable: {
          offset: 0,
          pageNumber: 0,
          pageSize: 0,
          paged: false,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true
          },
          unpaged: true
        },
        size: 0,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true
        },
        totalElements: 0,
        totalPages: 0
      });
    };
  }

}
