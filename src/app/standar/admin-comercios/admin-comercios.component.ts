import { Component, OnInit } from '@angular/core';
import { Comercio } from 'src/app/models/comercio';
import { ComercioService } from 'src/app/services/comercio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-comercios',
  templateUrl: './admin-comercios.component.html',
  styleUrls: ['./admin-comercios.component.sass']
})
export class AdminComerciosComponent implements OnInit {

  headers: String[] = ['#', 'Nombre', 'Propietario', 'Telefono', 'Categoria', 'Direccion']
  comercios: Comercio[] = []

  constructor(private comercioService: ComercioService, private router: Router) { }

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
  eliminar(id: string) {
    console.log(id)
  }

}
