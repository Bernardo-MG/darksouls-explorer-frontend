import { Observable } from "rxjs";
import { Response } from '@app/api/models/response';
import { Request } from "./request";

export type Endpoint<T> = (request: Request<T>) => Observable<Response<T[]>>;