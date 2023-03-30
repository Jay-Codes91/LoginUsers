import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      correo: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      contraseña: ['', Validators.compose([
        Validators.required
      ])]
    })
   }

  ngOnInit(): void {
  }

  login(){
    alert("Ok");
  }

}
