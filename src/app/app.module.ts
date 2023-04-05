import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


//Primeng
import {CaptchaModule} from 'primeng/captcha';

//Services
import { LoginService } from './Services/login.service';
import { CorreoService } from './Services/correo.service';
import { UrlService } from './Services/url.service';
import {RegistroService} from './Services/registro.service';
//Security
import { JwtInterceptor } from './Security/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CaptchaModule
  ],
  providers: 
  [
    LoginService,
    CorreoService,
    UrlService,
    RegistroService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,  multi: true}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
