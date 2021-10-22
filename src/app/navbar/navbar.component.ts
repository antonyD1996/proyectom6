import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  rutas: any[] = [{ nombre: 'Comercios', url: '/comercios/admin' }]
  token: string
  admin: boolean
  isLogedIn: boolean

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    const admin = localStorage.getItem('rol') === 'admin'

    this.authService.isLogin$.subscribe(res => {
      this.isLogedIn = res

    })


    const usuarios = { nombre: 'Usuarios', url: '/users' }

    if (token) {
      this.authService.isLogin.next(true)
    }

    if (admin) {
      this.rutas.push(usuarios)
    }
  }

  logIn() {

    this.router.navigateByUrl('/auth/login')
  }

  logOut() {
    this.authService.logout()
  }

}
