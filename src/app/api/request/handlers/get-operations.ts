import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response } from '../models/response';

export class GetOperations {

  protected params: { params?: HttpParams } = {};

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public request<T>(): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.queryUrl, this.params).pipe(
      map((response: Response<T>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public requestUnwrapped<T>(): Observable<T> {
    return this.request<T>().pipe(map(r => r.content));
  }

  public order(field: string, direction: string): GetOperations {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append('sort', `${field},${direction}`);

    this.params = { params: prms };

    return this;
  }

  public page(page: number): GetOperations {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('page', page);

    this.params = { params: prms };

    return this;
  }

  public pageSize(size: number): GetOperations {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('size', size);

    this.params = { params: prms };

    return this;
  }

  public parameter(name: string, value: any): GetOperations {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append(name, value);

    this.params = { params: prms };

    return this;
  }

  private getHttpParams(): HttpParams {
    let prms: HttpParams;

    if (this.params.params) {
      prms = this.params.params;
    } else {
      prms = new HttpParams();
      this.params = { params: prms };
    }

    return prms;
  }

  private handleError() {
    return (error: any) => {

      console.error(error);

      throw new Error(error);
    };
  }

}
