import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../Services/login.service";

@Injectable()

export class JwtInterceptor implements HttpInterceptor{

    constructor(private ser: LoginService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const usuario = this.ser.usuarioData;

        if(usuario){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.tokenReg}`
                }
            });
        }

        return next.handle(request);
    }
}