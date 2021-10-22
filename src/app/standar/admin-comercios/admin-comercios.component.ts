import { Component, OnInit } from '@angular/core';
import { Comercio } from 'src/app/models/comercio';
import { ComercioService } from 'src/app/services/comercio.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-admin-comercios',
  templateUrl: './admin-comercios.component.html',
  styleUrls: ['./admin-comercios.component.sass']
})
export class AdminComerciosComponent implements OnInit {

  headers: String[] = ['#', 'Nombre', 'Propietario', 'Telefono', 'Categoria', 'Direccion']
  comercios: Comercio[] = []

  constructor(private comercioService: ComercioService, private router: Router, private _toastService: ToastService) { }

  ngOnInit(): void {
    this.comercioService.getComercios().then(res => {
      res.subscribe(res => {
        this.comercios = res
      })
    })

  }

  redirect(): void {
    this.router.navigateByUrl('/comercios/agregar')
  }

  editar(id: string) {
    this.router.navigateByUrl('comercios/editar/' + id)
  }
  async eliminar(id: string) {
    const res = await this.comercioService.eliminarComercio(id)

    res.subscribe(resp => {
      console.log(resp)
      if (resp.mensaje === 'Comercio eliminado') {
        this._toastService.error("Comercio Eliminado!")
        this.comercios = this.comercios.filter(c => c._id != id)
      }
    })
  }

}
