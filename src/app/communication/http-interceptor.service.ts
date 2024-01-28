import { Inject, InjectionToken, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { fromEvent, Observable, throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';
export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
import { Injectable } from '@angular/core';
import { Constants } from '../models/Constants';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private onlineEvent: Observable<Event> = new Observable<Event>();
  private offlineEvent: Observable<Event> = new Observable<Event>();
  constructor(private injector: Injector, @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {
    try {
      this.onlineEvent = fromEvent(window, 'online');
      this.offlineEvent = fromEvent(window, 'offline');

      this.onlineEvent.subscribe(e => {
        console.log('Application is Online');
      });
      this.offlineEvent.subscribe(e => {
        console.log('Application is Offline');
      });
    } catch (error) {
      console.log(error);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = request.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);
    if (this.apiWithNoHeaders(request)) {
      return next.handle(request).pipe(timeout(timeoutValueNumeric));
    } else {
      return next.handle(this.addHeadersToRequest(request)).pipe(timeout(timeoutValueNumeric));
    }
  }

  addHeadersToRequest(req: HttpRequest<any>): HttpRequest<any> {
    const tHeaders: HttpHeaders = new HttpHeaders();
    tHeaders.set('Content-Type', 'application/json');
    const accessToken = 'Token'
    if (accessToken) {
      tHeaders.set('Authorization', `Bearer ${accessToken}`);
      return req.clone({
        headers: tHeaders
      });
    } else {
      return req;
    }
  }

  handleErrors(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const errorCode = (error as HttpErrorResponse).status;
    switch (errorCode) {
      case 404:
        return this.handle404Error(error);
      case 401:
        return this.handle401Error(error);
      default:
        return this.handleOtherErrors(error);
    }
  }

  handle401Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    return throwError(error);
  }

  handle404Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (error && error.status === 400) {
      return throwError(error);
    }

    return throwError(error);
  }

  handleOtherErrors(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    return throwError(error);
  }

  apiWithNoHeaders(request: HttpRequest<object>): boolean {
    return Constants.apiWithoutHeader.includes(request.url);
  }

}