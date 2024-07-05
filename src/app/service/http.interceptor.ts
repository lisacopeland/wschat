import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.error instanceof ErrorEvent) {
          console.error(
            `This is client side error, Error: ${err.error.error}`
          );
        } else {
          console.error(
            `This is server side error, ErrorCode: ${err.status} Message: ${err.message}`
          );
        }

        // Couldnt find api route
        let error = `${err.status} Error`;

        if (
          err.error !== null &&
          err.error.message !== undefined
        ) {
          error = err.error.message;
        } else if (err.message !== undefined) {
          error = err.message;
        }

        throw new HttpErrorResponse({
          error: error,
          headers: err.headers,
          status: err.status,
          statusText: err.statusText,
          url: err.url,
        });
      })
    );
  }
}
