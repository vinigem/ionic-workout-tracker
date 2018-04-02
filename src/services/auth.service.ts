import {Injectable} from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

const LOGIN_URL = 'https://workout-tracker-server.herokuapp.com/login';
const REGISTER_URL = 'https://workout-tracker-server.herokuapp.com/register';
const LOGOUT_URL = 'https://workout-tracker-server.herokuapp.com/logout';

@Injectable()
export class AuthService implements HttpInterceptor {
    
    constructor(public httpClient : HttpClient, public storage: Storage) {
        this.storage.get('user').then(user => {
            if(user != null) {
                this.login(JSON.stringify(user));
            }
        })
    }
    
    register(user: any): Observable<any> {
        return this.httpClient.post(REGISTER_URL, user);
    }

    login(user: any): Observable<any> {
        let headers = new HttpHeaders();
        var base64Credential: string = btoa( user.username+ ':' + user.password);
        headers.append("Authorization", "Basic " + base64Credential);

        return this.httpClient.post(LOGIN_URL, user, { headers, observe: 'response' });
    }

    logout() {
        return this.httpClient.post(LOGOUT_URL, {})
        .subscribe(() => {
            localStorage.removeItem('access_token');
        });
    }

    setToken(token: string) {
        localStorage.setItem('access_token', token);
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