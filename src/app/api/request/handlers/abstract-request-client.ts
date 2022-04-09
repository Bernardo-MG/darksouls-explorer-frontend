import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Response } from '../models/response';

export abstract class AbstractClient {

  protected params: { params?: HttpParams } = {};

  protected url: string = "";

  constructor(
    protected http: HttpClient
  ) {
  }

  public get<T>(): Observable<T> {
    return this.getResponse<T>().pipe(map(r => r.content));
  }

  public request(url: string) {
    this.params = {};

    this.url = url;
    return this;
  }

  public order(field: string, direction: string) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append('sort', `${field},${direction}`);

    this.params = { params: prms };

    return this;
  }

  public parameter(name: string, value: any) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms = prms.append(name, value);

    this.params = { params: prms };

    return this;
  }

  protected abstract getResponse<T>(): Observable<Response<T>>;

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
