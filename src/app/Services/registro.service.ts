import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  urlServidor: string = '';
  UrlApi: string = '/api/Usuarios';

  constructor(private http: HttpClient, private ser: UrlService) { 
    this.urlServidor = this.ser.urlService;
  }

  addUsers(user: any): Observable<any>{
    return this.http.post(this.urlServidor + this.UrlApi, user);
  }

  getCedulaUser(cedula: any): Observable<any>{
    return this.http.get(this.urlServidor + this.UrlApi + "/" + cedula);
  }
}
