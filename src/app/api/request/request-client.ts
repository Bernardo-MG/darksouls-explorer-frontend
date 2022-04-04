import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RequestClient {
  
  protected params: { params?: HttpParams } = {};

  protected url: string = "";
  
  constructor(
    protected http: HttpClient
  ) {
  }

  get<T>(): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.url, this.params).pipe(
      map((response: Response<T>) => { return response })
    ).pipe(
      catchError(this.handleErrorPaged())
    );
  }

  request(url: string) {
    this.params = {};

    this.url = url;
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

  protected getHttpParams() {
    let prms: HttpParams;

    if (this.params.params) {
      prms = this.params.params;
    } else {
      prms = new HttpParams();
      this.params = { params: prms };
    }

    return prms;
  }

  protected handleErrorPaged() {
    return (error: any) => {

      console.error(error);

      throw new Error(error);
    };
  }

}
