import { HttpClient, HttpParams } from '@angular/common/http';
import { PageRequest } from '@app/api/models/page-request';
import { Sort } from '@app/api/models/sort';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response } from '../../models/response';

export class GetOperations<T> {

  protected params: { params?: HttpParams } = {};

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public request(): Observable<Response<T[]>> {
    return this.http.get<Response<T[]>>(this.queryUrl, this.params).pipe(
      map((response: Response<T[]>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public requestUnwrapped(): Observable<T[]> {
    return this.request().pipe(map(r => r.content));
  }

  public requestOne(): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.queryUrl, this.params).pipe(
      map((response: Response<T>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public requestOneUnwrapped(): Observable<T> {
    return this.requestOne().pipe(map(r => r.content));
  }
  
  public sort(sort: Sort<T>): GetOperations<T> {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append('sort', `${sort.property},${sort.order}`);

    this.params = { params: prms };

    return this;
  }

  public page(page: PageRequest): GetOperations<T> {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('page', page.page);
    prms = prms.set('size', page.size);

    this.params = { params: prms };

    return this;
  }

  public parameter(name: string, value: any): GetOperations<T> {
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
