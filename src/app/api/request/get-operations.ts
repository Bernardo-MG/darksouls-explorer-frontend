import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '@app/api/models/pagination';
import { Sort } from '@app/api/models/sort';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';

export class GetOperations<T> {

  protected params: { params?: HttpParams } = {};

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public fetch(): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(this.queryUrl, this.params).pipe(
      map((response: ApiResponse<T[]>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public fetchUnwrapped(): Observable<T[]> {
    return this.fetch().pipe(map(r => r.content));
  }

  public fetchOne(): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.queryUrl, this.params).pipe(
      map((response: ApiResponse<T>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public fetchOneUnwrapped(): Observable<T> {
    // TODO: add unwrap operation to be used after fetch
    return this.fetchOne().pipe(map(r => r.content));
  }

  public sort(sort: Sort<T>): GetOperations<T> {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append('sort', `${String(sort.property)},${sort.order}`);

    this.params = { params: prms };

    return this;
  }

  public page(pagination: Pagination| undefined): GetOperations<T> {
    let prms: HttpParams;

    if(pagination){
      prms = this.getHttpParams();
  
      prms = prms.set('page', pagination.page);
      prms = prms.set('size', pagination.size);
  
      this.params = { params: prms };
    }

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
