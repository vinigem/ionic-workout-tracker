import {Injectable} from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';

const AUTH_URL = '';
const REGISTER_URL = '';

@Injectable()
export class AuthService implements HttpInterceptor {

  constructor(public httpClient : HttpClient) {}

  register(data): Observable<any> {
    return this.httpClient.post(REGISTER_URL, data);
  }

  authenticate(data): Observable<any> {
    return this.httpClient.post(AUTH_URL, data);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const token = sessionStorage.getItem('token');
    if ((AUTH_URL.indexOf(request.url) === -1 || REGISTER_URL.indexOf(request.url) === -1) && token) {
        // Add auth token
        request = request.clone({
            setHeaders: {
                Authorization: `Basic ${token}`
            }
        });
    }
    return next.handle(request);
}

}