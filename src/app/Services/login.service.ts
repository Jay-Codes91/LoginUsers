import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UrlService } from './url.service';
import {map} from 'rxjs/operators';
import { Usuario } from '../Models/Usuario';
import { Login } from '../Models/Login';
import { Response } from '../Models/Response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlService: string = '';
  urlApi: string = '/api/Login/login';
  private usuarioSubject!: BehaviorSubject<Usuario>;
  public usuario!:Observable<Usuario>;
  public usuario2 = '';
  public get usuarioData(): Usuario{
    return this.usuarioSubject.value;
  }

  constructor(private http: HttpClient, private ser: UrlService) {
    this.urlService = this.ser.urlService;
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario') || "[]"));
    this.usuario = this.usuarioSubject.asObservable();
   }

   login(login: Login): Observable<Response>{
      return this.http.post<Response>(this.urlService + this.urlApi, login, httpOption).pipe(
        map(res=>{
          if(res.exito === 1){
            const usuario: Usuario = res.data;
            localStorage.setItem('usuario', JSON.stringify(usuario));
          }
          return res;
        })
      )
   }

   logOut(){
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null!);
   }

   getUsuario(){
    return this.usuario2 = JSON.parse(localStorage.getItem('usuario') || "[]");
   }


}
