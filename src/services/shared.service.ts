import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: "root"
})
export class SharedService {
  private loggedInSubject: BehaviorSubject<any>;
  public isLoggedInObserver: any;

  constructor(private httpClient: HttpClient) {
    this.loggedInSubject = new BehaviorSubject(this.isLoggedIn());
    this.isLoggedInObserver = this.loggedInSubject.asObservable();
  }

  isLoggedIn() {
    return !!window.localStorage.getItem("access_token");
  }

  setLoggedInSubject(bool) {
    this.loggedInSubject.next(bool);
  }

  httpPost(url: any, body?: any): Observable<any> {
    // const headers = new HttpHeaders();
    let headers;
    const access_token = window.localStorage.getItem("access_token");
    if (access_token) {
      headers = new HttpHeaders()
        .set("Authorization", "JWT " + access_token)
        .set("Content-Type", "application/json");
    }
    return this.httpClient.post(environment.api_url + url, body, {
      headers: headers
    });
  }

  httpGet(url: any, requestParams?: HttpParams): Observable<any> {
    const access_token = "JWT " + window.localStorage.getItem("access_token");
    const headers = new HttpHeaders()
      .append("Authorization", access_token)
      .append("Accept", "application/json");

    return this.httpClient.get(environment.api_url + url, {
      responseType: "json",
      headers: headers,
      params: requestParams
    });
  }
}
