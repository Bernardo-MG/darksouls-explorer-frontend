import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestClientOperations } from "./request-client-operations";

@Injectable({
  providedIn: 'root'
})
export class RequestClient {

  constructor(
    private http: HttpClient
  ) { }

  public get(url: string): RequestClientOperations {
    return new RequestClientOperations(this.http, url);
  }

}