import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  datos: any;

  constructor(private fb: FormBuilder, private serLog: LoginService, private route: Router) {
    this.form = fb.group({
      correo: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      contraseña: ['', Validators.compose([
        Validators.required
      ])],
      cedula: [''],
      nombre: [''],
      apellido1: [''],
      apellido2: [''],
      direccion: ['']

    })
   }

  ngOnInit(): void {
  }

  login(){
    
    const ced = '';
    const nom = '';
    const ape1 = '';
    const ape2 = '';
    const direccion = '';

    const usuario = {
       cedula: ced,
       nombre: nom,
       apellido1: ape1,
       apellido2: ape2,
       correo: this.form.get('correo')?.value,
       direccion: direccion,
       contraseña: this.form.get('contraseña')?.value
       

    }

    console.log(usuario);

    this.serLog.login(usuario).subscribe(data=>{
      
      if(data.exito === 1){
        this.route.navigate(['/usuario']);
      }
    }, error =>{
      alert("Correo o contraseña incorrecta");
    })
  }

}
