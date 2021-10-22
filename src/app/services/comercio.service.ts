import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Comercio } from '../models/comercio';
import { Categoria } from '../models/categoria';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {
  url: string = environment.URL_BASE
  token: string = localStorage.getItem('token')
  headers_object: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + this.token
  });



  constructor(private http: HttpClient, private router: Router) {


  }

  async getComercios(): Promise<Observable<Comercio[]>> {
    const comercios = await this.http.get<Comercio[]>(this.url + 'listadoComercios', { headers: this.headers_object })
    return comercios
  }

  async getComercio(id: String): Promise<Observable<Comercio>> {
    const comercios = await this.http.get<Comercio>(this.url + 'comercios/' + id, { headers: this.headers_object })
    return comercios
  }

  async guardarComercios(comercio: FormGroup): Promise<Observable<Comercio>> {
    const id = comercio['_id']

    return id ?
      await this.http.put<Comercio>(this.url + 'comercios/' + id, comercio, { headers: this.headers_object }) :
      await this.http.post<Comercio>(this.url + 'comercios', comercio, { headers: this.headers_object })
  }

  async eliminarComercio(id: String): Promise<Observable<any>> {
    const res = await this.http.delete(this.url + 'comercios/' + id, { headers: this.headers_object })

    return res
  }

  getCategorias(): Categoria[] {
    const categorias = []

    categorias.push({ id: 1, Nombre: 'Restaurante' })
    categorias.push({ id: 2, Nombre: 'Zapateria' })
    categorias.push({ id: 3, Nombre: 'Belleza' })


    return categorias
  }




}
