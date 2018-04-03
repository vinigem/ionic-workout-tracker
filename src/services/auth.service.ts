import {Injectable} from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';

const LOGIN_URL:string = 'https://workout-tracker-server.herokuapp.com/login';
const REGISTER_URL:string = 'https://workout-tracker-server.herokuapp.com/register';
//const LOGOUT_URL = 'https://workout-tracker-server.herokuapp.com/logout';

@Injectable()
export class AuthService implements HttpInterceptor {

    username: string;
    
    constructor(public httpClient : HttpClient) {}

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string) {
        this.username = username;
    }
    
    register(user: any): Observable<any> {
        return this.httpClient.post(REGISTER_URL, user);
    }

    login(user: any): Observable<any> {
        let headers = new HttpHeaders();
        var base64Credential: string = btoa(user.username + ':' + user.password);
        headers.append("Authorization", "Basic " + base64Credential);

        return this.httpClient.post(LOGIN_URL, user, { headers, observe: 'response' });
    }

    setUserToken(user: any) {
        const token = btoa(user.username + ':' + user.password);
        localStorage.setItem('access_token', token);
        this.username = user.username;
    }
  

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token');
        if (REGISTER_URL != request.url && token) {
            // Add auth token
            request = request.clone({
                withCredentials: true,
                setHeaders: {
                    Authorization: `Basic ${token}`
                }
            });
        }
        return next.handle(request);
    }

}