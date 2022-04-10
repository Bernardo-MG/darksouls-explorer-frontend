import { Observable } from "rxjs";
import { Response } from '@app/api/models/response';

export type Endpoint<T> = (page: number, search: any) => Observable<Response<T[]>>;