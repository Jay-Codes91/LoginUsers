import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  urlServidor = '';
  
  UrlApi = '/api/Correo';

  constructor(private http: HttpClient, private ser: UrlService) { 
    this.urlServidor = this.ser.urlService;
  }

  sendCorreo(correo: any): Observable<any>{
    return this.http.post(this.urlServidor + this.UrlApi, correo);
  }
  
}
