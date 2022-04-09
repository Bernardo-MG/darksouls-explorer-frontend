import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginatedResponse } from '../models/paginated-response';

export class RequestClientOperations {

  protected params: { params?: HttpParams } = {};

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public get<T>(): Observable<T> {
    return this.getResponse<T>().pipe(map(r => r.content));
  }

  public order(field: string, direction: string): RequestClientOperations {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append('sort', `${field},${direction}`);

    this.params = { params: prms };

    return this;
  }

  public parameter(name: string, value: any): RequestClientOperations {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append(name, value);

    this.params = { params: prms };

    return this;
  }

  public page(page: number): RequestClientOperations {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('page', page);

    this.params = { params: prms };

    return this;
  }

  public pageSize(size: number): RequestClientOperations {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.set('size', size);

    this.params = { params: prms };

    return this;
  }

  public getResponse<T>(): Observable<PaginatedResponse<T>> {
    return this.http.get<PaginatedResponse<T>>(this.queryUrl, this.params).pipe(
      map((response: PaginatedResponse<T>) => { return response })
    ).pipe(
      catchError(this.handleErrorPaged())
    );
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

  private handleErrorPaged() {
    return (error: any) => {

      console.error(error);

      throw new Error(error);
    };
  }

}
