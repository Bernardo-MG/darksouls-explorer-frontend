import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class PaginationClient {

  constructor(
    private http: HttpClient
  ) { }

  request(url: string) {
    return new FluentClient(this.http, url);
  }

}

class FluentClient {

  params: { params?: HttpParams } = {};

  constructor(
    private http: HttpClient,
    private url: string
  ) { }

  page(page: number) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('page', page);

    this.params = { params: prms };

    return this;
  }

  pageSize(size: number) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('size', size);

    this.params = { params: prms };

    return this;
  }

  order(field: string, direction: string) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append('sort', `${field},${direction}`);

    this.params = { params: prms };

    return this;
  }

  get<T>(): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.url, this.params).pipe(
      map((response: Response<T>) => { return response })
    ).pipe(
      catchError(this.handleError<T>())
    );
  }

  private handleError<T>() {
    return (error: any): Observable<Response<T>> => {

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

}
