import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginFormulario!: FormGroup


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token')
    if (token) {
      this.router.navigateByUrl('/comercios')
    }


    this.loginFormulario = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(1)]),
    })
  }

  enviar(): void {
    this.authService.autenticarUsuario(this.loginFormulario.value)
  }

}
