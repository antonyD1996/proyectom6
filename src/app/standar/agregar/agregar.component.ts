import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comercio } from 'src/app/models/comercio';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import { Categoria } from './../../models/categoria';
import { ComercioService } from 'src/app/services/comercio.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.sass']
})
export class AgregarComponent implements OnInit {
  comercioForm!: FormGroup
  urlBase: string = environment.URL_BASE + 'comercios/'
  accion: string = 'Registrar'
  idComercio!: string;
  comercio: Comercio = {} as Comercio;
  mapa: Mapboxgl.Map;
  categorias: Categoria[] = [
    { id: 1, nombre: 'Restaurante' },
    { id: 2, nombre: 'Zapateria' },
    { id: 3, nombre: 'Belleza' }]


  constructor(private _toastService: ToastService, private activedRoute: ActivatedRoute, private router: Router, private comercioService: ComercioService) { }

  ngOnInit(): void {


    (Mapboxgl as any).accessToken = environment.tokenmapa;

    this.activedRoute.params.subscribe(param => {
      this.idComercio = param['id']
    })

    this.comercioForm = new FormGroup({
      'nombre': new FormControl('test', [Validators.required, Validators.minLength(1)]),
      'nombrePropietario': new FormControl('test', [Validators.required, Validators.minLength(1)]),
      'telefono': new FormControl('12345678', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      'categoria': new FormControl('1'),
      'descripcion': new FormControl('test', [Validators.required, Validators.minLength(1)]),
      'direccion': new FormControl('test', [Validators.required, Validators.minLength(1)]),
      'longitud': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'latitud': new FormControl('', [Validators.required, Validators.minLength(1)]),
    })

    if (this.idComercio) {
      this.comercioService.getComercio(this.idComercio).then(
        res => res.subscribe(
          comer => {
            this.comercio = comer
            this.mapa = new Mapboxgl.Map({
              container: 'contenedormapa',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [this.comercio.longitud, this.comercio.latitud],
              zoom: 10.6
            });

            this.marcador(this.comercio.longitud, this.comercio.latitud)
            this.comercioForm = new FormGroup({
              'nombre': new FormControl(this.comercio.nombre, [Validators.required, Validators.minLength(1)]),
              'nombrePropietario': new FormControl(this.comercio.nombrePropietario, [Validators.required, Validators.minLength(1)]),
              'telefono': new FormControl(this.comercio.telefono, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
              'categoria': new FormControl(this.comercio.categoria),
              'descripcion': new FormControl(this.comercio.descripcion, [Validators.required, Validators.minLength(1)]),
              'direccion': new FormControl(this.comercio.direccion, [Validators.required, Validators.minLength(1)]),
              'longitud': new FormControl(this.comercio.longitud, [Validators.required, Validators.minLength(1)]),
              'latitud': new FormControl(this.comercio.latitud, [Validators.required, Validators.minLength(1)]),
              '_id': new FormControl(this.idComercio, [Validators.required, Validators.minLength(1)]),
            })
          }

        )
      )
    } else {
      this.mapa = new Mapboxgl.Map({
        container: 'contenedormapa',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-88.94, 14.04],
        zoom: 10.6
      });
      this.marcador(-88.94, 14.04)
    }
  }

  enviar(): void {
    this.comercioService.guardarComercios(this.comercioForm.value).then(res => {
      res.subscribe(resp => {
        if (resp._id) {
          this._toastService.success("Comercio guardado")
        }
      })
    })
  }

  marcador(lon: number, lat: number) {


    const marca = new Mapboxgl.Marker({
      draggable: true,
      color: 'red'

    })
      .setLngLat([lon, lat])
      .addTo(this.mapa);

    marca.on('dragend', () => {
      const coordenadas = marca.getLngLat()
      this.comercioForm.patchValue({
        'longitud': coordenadas.lng,
        'latitud': coordenadas.lat,
      })
    });
  }

}
