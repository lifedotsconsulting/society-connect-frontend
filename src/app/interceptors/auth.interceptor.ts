import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authTokensStr = localStorage.getItem('authTokens');
        let token = null;

        if (authTokensStr) {
            try {
                const tokens = JSON.parse(authTokensStr);
                token = tokens.access?.token || tokens.token; // Handle typical token structures
            } catch (e) {
                console.error("Failed to parse authTokens", e);
            }
        }

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
