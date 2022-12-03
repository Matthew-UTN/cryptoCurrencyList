import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

  //https://coinicons-api.vercel.app/api/icon/xrp
  baseUrl = "https://api.wazirx.com/sapi/v1/tickers/24hr";

  constructor(private httpClient: HttpClient) { }

  //Calls to the database for users
  getAllCryptos() {
    return this.httpClient.get(this.baseUrl).pipe(
      catchError(this.processError)
    );
  }

  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => new Error(message));
  }
}
