import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthData } from '../data/auth';
import { SpinnerService } from 'src/app/components/spinner/spinner.service';
import { tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable() 
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private service: AuthData, private spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        this.spinnerService.show();

        let tokenizedReq = req.clone({
            setHeaders: {
                'Authorization' : 'vinorsoft ' + this.service.getToken()
            }
        })
        return next.handle(tokenizedReq).pipe(
            finalize(() => {
                this.spinnerService.hide();
            })
        );
    }

}