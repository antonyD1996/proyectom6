import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtResponse } from './../models/jwt-response';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.URL_BASE


  constructor(private http: HttpClient, private router: Router) { }

  autenticarUsuario(user: object): any {
    console.log(user)
    this.http.post<JwtResponse>(this.url + 'autenticacion', user).subscribe(res => {
      if (res.token) {
        console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('rol', res['user']['rol']['nombre'])
        this.router.navigateByUrl('/comercios')
      }
    })
  }

  validarAdmin(): Observable<boolean> {
    const rol = localStorage.getItem('rol')
    if (rol === 'admin') {
      return of(true)
    } else {
      return of(false)
    }
  }
}
