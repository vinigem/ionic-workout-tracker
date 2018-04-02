import {Injectable} from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';

const LOGIN_URL = 'https://workout-tracker-server.herokuapp.com/login';
const REGISTER_URL = 'https://workout-tracker-server.herokuapp.com/register';
const LOGOUT_URL = 'https://workout-tracker-server.herokuapp.com/logout';

@Injectable()
export class AuthService implements HttpInterceptor {

    loggedIn: boolean;

    constructor(public httpClient : HttpClient) {}

    register(user: any): Observable<any> {
        return this.httpClient.post(REGISTER_URL, user);
    }

    login(user: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Accept', 'application/json')
        var base64Credential: string = btoa( user.username+ ':' + user.password);
        headers.append("Authorization", "Basic " + base64Credential);

        return this.httpClient.post(LOGIN_URL, user, { headers });
    }

    logout() {
        return this.httpClient.post(LOGOUT_URL, {})
        .subscribe(() => {
            localStorage.removeItem('access_token');
        });
    }

    setToken(token: string) {
        localStorage.setItem('access_token', token);
        this.loggedIn = true;
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token');
        if ((LOGIN_URL.indexOf(request.url) === -1 || REGISTER_URL.indexOf(request.url) === -1) && token) {
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