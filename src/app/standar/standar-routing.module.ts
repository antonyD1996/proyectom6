import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComerciosComponent } from './comercios/comercios.component';
import { IndexComponent } from './index/index.component';
import { ValidarTokenGuard } from './../guards/validar-token.guard';
import { AgregarComponent } from './agregar/agregar.component';
import { AdminComerciosComponent } from './admin-comercios/admin-comercios.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      { path: '', component: ComerciosComponent },
      { path: 'agregar', component: AgregarComponent, canActivate: [ValidarTokenGuard] },
      { path: 'editar/:id', component: AgregarComponent, canActivate: [ValidarTokenGuard] },
      { path: 'admin', component: AdminComerciosComponent, canActivate: [ValidarTokenGuard] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],




  exports: [RouterModule]
})
export class StandarRoutingModule { }
