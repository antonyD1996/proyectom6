import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtResponse } from './../models/jwt-response';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.URL_BASE
  isLogin: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  isLogin$ = this.isLogin.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  autenticarUsuario(user: object): any {
    console.log(user)
    this.http.post<JwtResponse>(this.url + 'autenticacion', user).subscribe(res => {
      if (res.token) {
        console.log(res)
        this.login(res.token, res['user']['rol']['nombre'])
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

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    this.isLogin.next(false);
    this.router.navigateByUrl('/comercios')
  }

  login(token: string, rol: string): void {
    localStorage.setItem('token', token)
    localStorage.setItem('rol', rol)
    this.isLogin.next(true);
    this.router.navigateByUrl('/comercios')
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem("token")
    if (token) {
      return of(true)
    } else {
      return of(false)
    }
  }
}
