import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { Comercio } from 'src/app/models/comercio';
import { environment } from 'src/environments/environment';
import { ComercioService } from './../../services/comercio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.sass']
})
export class ComerciosComponent implements OnInit {
  mapa: Mapboxgl.Map;
  title = 'proyectomapa';
  comercios: Comercio[] = []
  comercio: Comercio = {} as Comercio


  constructor(private comercioService: ComercioService, private router: Router) { }

  ngOnInit(): void {

    (Mapboxgl as any).accessToken = environment.tokenmapa;
    this.mapa = new Mapboxgl.Map({
      container: 'contenedormapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-88.94, 14.04],
      zoom: 10.6
    });


    this.comercioService.getComercios().then(res => {
      res.subscribe(res => {
        this.comercio = res[1]
        res.forEach(comercio => {
          console.log(comercio)
          this.marcador(comercio)
        })
      })
    })



  }


  marcador(comercio: Comercio) {

    var html = `
    <div class="mt-2 d-flex justify-content-center col">
    <div class="card mb-2 col">
      <div class="card-body d-flex justify-content-between">
        <div class="row align-items-center">
          <div class="col">
            <h5 class="card-title mb-3">${comercio.nombre}</h5>
            <span class="icono-titles">
              <i class="fas fa-phone"></i>
              ${comercio.telefono}
            </span>

            <span class="icono-titles mx-3">
              <i class="fas fa-map-marker-alt"></i>
              ${comercio.direccion}
            </span>

            <span class="icono-titles">
              <i class="fas fa-utensils"></i>
              ${comercio.nombrePropietario}
            </span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
    `


    const globo = new Mapboxgl.Popup()
      .setHTML(html)

    const marca = new Mapboxgl.Marker({
      draggable: false,
      color: 'red'

    })
      .setLngLat([comercio.longitud, comercio.latitud])
      .setPopup(globo)
      .addTo(this.mapa);

    marca.on('dragend', () => {
      console.log(marca.getLngLat())
    });
  }

}
