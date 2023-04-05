import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CorreoService } from 'src/app/Services/correo.service';
import { RegistroService } from 'src/app/Services/registro.service';
import { LoginService } from 'src/app/Services/login.service';

declare var Swal: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

 form: FormGroup;
  soloLetras = '^[A-Za-z\u00C0-\u017F]+$';
  soloNumeros = '^[0-9]+$';
  recaptcha = 'recaptcha';
  siteKey: string = '6LdmgU8lAAAAALpiWolMB4u-tkURcRueWe3siAEI';
  cedulaUser = '';
  correoUser = '';
  constructor(private fb: FormBuilder, 
              private route: Router, 
              private serCorreo: CorreoService,
              private serRegistro: RegistroService, 
              private serLog: LoginService) { 
    this.form = fb.group({
      cedula: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(this.soloLetras)
      ])],
      apellido1: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(this.soloLetras)
      ])],
      apellido2: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(this.soloLetras)
      ])],
      fechaNacimiento: ['', Validators.compose([
        Validators.required
      ])],
      edad: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(2),
        Validators.pattern(this.soloNumeros)
      ])],
      correo: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.email
      ])],
      direccion: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])],
      contraseña: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])],
      contraseña2: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])]
    })
  }

  ngOnInit(): void {
  }

  registro(){


    const Pass = this.form.get('contraseña')?.value;
    const confirmPass = this.form.get('contraseña2')?.value;
    const cedula = this.form.get('cedula')?.value;

    const usuario = {
      cedula: this.form.get('cedula')?.value,
      nombre: this.form.get('nombre')?.value,
      apellido1: this.form.get('apellido1')?.value,
      apellido2: this.form.get('apellido2')?.value,
      fechaNacimiento: this.form.get('fechaNacimiento')?.value,
      edad: this.form.get('edad')?.value,
      correo: this.form.get('correo')?.value,
      direccion: this.form.get('direccion')?.value,
      contraseña: this.form.get('contraseña')?.value,
    }

    this.serRegistro.getCedulaUser(cedula).subscribe(data =>{
      Swal.fire({
        icon: 'error',
        title: 'la cédula está registrada en el sistema',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2196F3'
      })
    }, error => {
      if(Pass != confirmPass){
        Swal.fire({
          icon: 'info',
          title: 'Contraseñas diferentes',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2196F3'
        })
      }else if(Pass == confirmPass){
  
        
        this.serRegistro.addUsers(usuario).subscribe(data=>{
          //this.form.reset();
          Swal.fire({
            icon: 'success',
            title: 'Registro completado',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2196F3'
          })
          this.correo();
          this.serLog.login(usuario).subscribe(data=>{
        
            if(data.exito === 1){
              this.route.navigate(['/usuario']);
            }
          }, error =>{
            Swal.fire({
              icon: 'error',
              title: 'No se pudo iniciar sesion',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2196F3'
            })
          })
        }, error =>{
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error, intentalo de nuevo',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2196F3'
          })
        })
  
      }
    })

     
  }

  correo(){

    this.correoUser = this.form.get('correo')?.value
    
    console.log("El correo es: " + this.correoUser);
    this.serCorreo.sendCorreo(this.correoUser).subscribe(data=>{
      Swal.fire({
        icon: 'info',
        title: 'Se ha enviado un mensaje a tu correo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2196F3'
      })
    }, error=>{
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2196F3'
      })
    })
  }

}
