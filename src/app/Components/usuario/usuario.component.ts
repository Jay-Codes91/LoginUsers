import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario!: Usuario;
  usuarioA: any;
  correo = '';
  idUsuario!: number;
  nombre= '';
  apellido1 = '';
  constructor(private serLogin: LoginService, private route: Router) { 
    this.serLogin.usuario.subscribe(res=>{
      this.usuario = res;
      console.log(this.usuario);
    })
    this.usuarioA = this.serLogin.getUsuario();
    this.nombre = this.usuarioA['nombre'];
    this.apellido1 = this.usuarioA['apellido1'];
    this.correo = this.usuarioA['correo'];

    
    console.log(this.correo);
  }

  ngOnInit(): void {
  }

  logOut(){
    this.serLogin.logOut();
    this.route.navigate(['/login']);
  }

}
