import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';


@Injectable()
export class LoaderService implements HttpInterceptor {

    loader: any;

    constructor(public loadingCtrl: LoadingController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // call to show overlay
        this.showOverlay();

        //  request start time
        const started = Date.now();

        return next
            .handle(request)
            .do((event: HttpEvent<any>) => { })
            .catch(response => {
                if (response instanceof HttpErrorResponse) {
                    console.log('Processing http error', response);
                }
                return Observable.throw(response);
            }).finally(() => {
                const elapsed = Date.now() - started;
                console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);

                // call to hide overlay
                this.hideOverlay();
            });
    }

    showOverlay() {
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
            duration: 10000
        });
        this.loader.present();
    }

    hideOverlay() {
        this.loader.dismiss();
    }

}