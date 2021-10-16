import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {


  constructor(private authService: AuthService, private router: Router) { }


  canActivate(): Observable<boolean> | boolean {
    console.log('estoy dentro del canActivate')

    return this.authService.validarAdmin().pipe(
      tap(valid => {
        if (valid) {
          return true
        } else {
          this.router.navigateByUrl('/auth/login')
          return false
        }
      })
    )
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('estoy dentro del canLoad')

    return this.authService.validarAdmin().pipe(
      tap(valid => {
        if (valid) {
          return true
        } else {
          this.router.navigateByUrl('/auth/login')
          return false
        }
      })
    )
  }
}
